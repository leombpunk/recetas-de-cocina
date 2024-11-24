import { unlink, rmdir, rename } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import { matchedData } from "express-validator"
import { handleResponse } from "../helpers/handleResponse.js"
import { httpError } from "../helpers/handleErrors.js"
import { compare, encrypt } from "../helpers/handleBcrypt.js"
import { verifyToken } from "../helpers/generateToken.js"
import models from "../models/index.js"

const publicPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "../public/images"
)

const getUsuario = async (req, res) => {
  try {
    const { usuario } = req.params
    const usuarioData = await models.Usuario.scope("basicUserData").findOne({
      where: { usuario: usuario },
    })
    if (usuarioData) {
      handleResponse(res, 200, "Datos del usuario", usuarioData)
      return
    } else {
      handleResponse(res, 400, "El usaurio no existe")
      return
    }
  } catch (error) {
    httpError(res, error)
    return
  }
}

const getRecetasByUserId = async (req, res) => {
  try {
    const id = req.params.id
    const recetas = await models.Usuario.getRecetasByUserId(id)
    res.send(recetas)
  } catch (error) {
    httpError(res, error)
  }
}

const getRecetasVisiblesByUserId = async (req, res) => {
  try {
    const id = req.params.id
    const recetas = await models.Usuario.getRecetasVisiblesByUserId(id)
    res.send(recetas)
  } catch (error) {
    httpError(res, error)
  }
}

const updateUsuario = async (req, res) => {
  try {
    const { usuario } = req.params
    const token = req.headers.authorization?.split(" ").pop()
    const usuarioToken = await verifyToken(token)
    const { nombres, apellidos, mail } = matchedData(req)
    console.log({ nombres, apellidos, mail })
    const result = await models.Usuario.update(
      { nombres: nombres, apellidos: apellidos, mail: mail },
      { where: { id: usuarioToken.id } }
    )
    if (result) {
      handleResponse(res, 200, "Datos de perfil actualizado", result)
      return
    } else {
      handleResponse(res, 400, "No se actualizó el perfil", result)
      return
    }
  } catch (error) {
    httpError(res, error)
    return
  }
}

const updateUsuarioPass = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ").pop()
    const usuarioToken = await verifyToken(token)
    const data = matchedData(req)
    const { oldPassword, newPassword } = data

    const usuario = await models.Usuario.scope("withPassword").findOne({
      where: { id: usuarioToken.id },
    })
    if (usuario) {
      if (!(await compare(oldPassword, usuario.contrasena))) {
        handleResponse(res, 404, "La contraseña actual no es correcta")
        return
      } else if (await compare(newPassword, usuario.contrasena)) {
        handleResponse(
          res,
          404,
          "La contraseña nueva debe ser distinta a la actual contraseña"
        )
        return
      } else {
        const newPassEncrypt = await encrypt(newPassword)
        usuario.contrasena = newPassEncrypt
        usuario.save({ fields: ["contrasena"] })
        if (usuario.changed()) {
          handleResponse(res, 200, "Contraseña actualizada correctamente")
          return
        } else {
          handleResponse(res, 400, "No se puedo realizar la operación")
          return
        }
      }
    } else {
      handleResponse(res, 404, "Usuario no encontrado")
      return
    }
  } catch (error) {
    httpError(res, error)
    return
  }
}

const deleteUsuario = async (req, res) => {
  try {
    const today = new Date()
    const { usuario } = req.params
    const token = req.headers.authorization?.split(" ").pop()
    const usuarioToken = await verifyToken(token)
    const { borrarTodo } = matchedData(req)

    const user = await models.Usuario.scope("withPassword").findOne({
      where: { id: usuarioToken.id },
    })

    //cosas a borrar

    if (user) {
      if (borrarTodo) {
        //si quiere borrar toda su información
        //cambiar la configuracion de las tablas para que el borrado se a en cascada

        // const archivos = await models.Archivo.findAll({
        //   where: { idUsuario: user.id, deleteAt: null },
        // })
        // console.log(archivos)
        // await models.Archivo.update(
        //   { deleteAt: today.toISOString() },
        //   { where: { idUsuario: user.id } }
        // )

        //elimina la carpeta de datos del usuario
        rmdir(`${publicPath}/users/${user.usuario}`, (error) => {
          if (error) {
            console.log(error)
          } else {
            console.log("carpeta borrada")
          }
        })
        //proceder a borrar todo
        user.destroy({ force: true })
        handleResponse(
          res,
          200,
          "Usuario eliminado (incluida toda su actividad)"
        )
        return
      } else {
        //si solo quiere borrar su info personal
        //borrar su foto de perfil (de la tabla usuarios y archivos)
        //actualizar la tabla usuarios con los siguientes lineamientos
        //nombres, apellidos, usuario, constraseña, mail, deleteAt (y algún otro dato sencible)
        //actualizarlos a datos genéricos, ej: nombre y apellido vacíos, usuario a anonimo[usuario.id]
        //la contraseña en blanco, deleteAt con la fecha en la que se borró
        //user deleteAt como filtro al momento de hacer login

        //borrar imagen de perfin si existe
        if ((user, imagen)) {
          unlink(
            `${publicPath}/users/${user.usuario}/${user.imagen}`,
            (error) => {
              if (error) {
                console.log(error)
              } else {
                console.log("imagen de perfil eliminada")
              }
            }
          )
        }
        //cambiar el nombre de la carpeta donde se guardan los archivos
        rename(
          `${publicPath}/users/${user.usuario}`,
          `${publicPath}/users/anonimo${user.id}`,
          (error) => {
            if (error) {
              console.log(error)
            } else {
              console.log("carpeta renombrada")
            }
          }
        )
        //modificar los datos sencibles
        user.nombres = ""
        user.apellidos = ""
        user.mail = ""
        user.usuario = `anonimo${user.id}`
        user.contrasena = ""
        user.imagen = null
        user.deleteAt = today.toISOString()
        user.save()

        if (user.changed()) {
          handleResponse(res, 200, "Usuario eliminado (solo datos sensibles)")
          return
        } else {
          handleResponse(
            res,
            400,
            "No se elimino el usuario, intentelo mas tarde"
          )
          return
        }
      }
    } else {
      handleResponse(res, 400, "El usuario no existe")
      return
    }
  } catch (error) {
    httpError(res, error)
    return
  }
}

//link account
const linkGoogleAccountCallback = async (req, res) => {
  console.log({ req })
  res.redirect(`http://localhost:3000/profile?googleId=${req.user.id}`) //redireccionar a otra ruta, por ejemplo la del perfil y le envio el
}

const linkGoogleAccount = async (req, res) => {
  //asignar el google id a la cuenta e informar
  try {
    const token = req.headers.authorization?.split(" ").pop()
    const usuarioToken = await verifyToken(token)
    const { googleId } = req.body
    console.log(googleId)
    const usuario = await models.Usuario.findOne({
      where: { id: usuarioToken.id },
    })
    if (usuario && googleId) {
      usuario.googleId = googleId
      usuario.save({ fields: ["googleId"] })
      if (usuario.changed()) {
        handleResponse(res, 200, "Cuenta de google vinculada", usuario)
        return
      } else {
        handleResponse(res, 404, "Paso alguito", usuario)
        return
      }
    } else {
      handleResponse(res, 400, "El usuario no existe")
      return
    }
  } catch (error) {
    httpError(res, error)
    return
  }
}

const unlinkGoogleAccount = async (req, res) => {
  //poner el google id en NULL y retornar el resultado
  try {
    const token = req.headers.authorization?.split(" ").pop()
    const usuarioToken = await verifyToken(token)
    const { googleId } = req.body
    console.log(googleId)
    const usuario = await models.Usuario.findOne({
      where: { id: usuarioToken.id, googleId: googleId },
    })
    if (usuario && googleId) {
      usuario.googleId = null
      usuario.save({ fields: ["googleId"] })
      if (usuario.changed()) {
        handleResponse(res, 200, "Cuenta de google desvinculada", usuario)
        return
      } else {
        handleResponse(res, 404, "Paso alguito", usuario)
        return
      }
    } else {
      handleResponse(res, 400, "El usuario no existe")
      return
    }
  } catch (error) {
    httpError(res, error)
    return
  }
}

export {
  getUsuario,
  getRecetasByUserId,
  getRecetasVisiblesByUserId,
  updateUsuario,
  deleteUsuario,
  updateUsuarioPass,
  linkGoogleAccountCallback,
  linkGoogleAccount,
  unlinkGoogleAccount,
}
