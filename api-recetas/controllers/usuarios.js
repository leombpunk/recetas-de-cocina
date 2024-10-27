import { matchedData } from "express-validator"
import { handleResponse } from "../helpers/handleResponse.js"
import { httpError } from "../helpers/handleErrors.js"
import { compare, encrypt } from "../helpers/handleBcrypt.js"
import { verifyToken } from "../helpers/generateToken.js"
import models from "../models/index.js"

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
    //que hago al borrar un usuario?
    const { usuario } = req.params
    const token = req.headers.authorization?.split(" ").pop()
    const usuarioToken = await verifyToken(token)
    const { borrarTodo } = matchedData(req)

    const user = await models.Usuario.findOne({
      where: { id: usuarioToken.id },
    })
    //cosas a borrar
    //si quiere borrar toda su información
    //cambiar la configuracion de las tablas para que el borrado se a en cascada
    //(si hice todo bien y como último paso) buscar en archivos todos los archivos del usuario y borrarlos
    //para no utilizar unlink en este proceso y que sea mas transparente para el usuario y para el programador
    //si solo quiere borrar su info personal
    //borrar su foto de perfil (de la tabla usuarios y archivos)
    //actualizar la tabla usuarios con los siguientes lineamientos
    //nombres, apellidos, usuario, constraseña, deleteAt (y algún otro dato sencible)
    //actualizarlos a datos genéricos, ej: nombre y apellido vacíos, usuario a anonimo[usuario.id]
    //la contraseña en blanco, deleteAt con la fecha en la que se borró
    //user deleteAt como filtro al momento de hacer login
    if (user) {
      //borro todas sus recetas?
      //o las dejo pero como anónimas?
      //creo que es mejor borrar todas las recetas (e ingredientes) junto al usuario y listo
      //y que hago con las imágenes?
      if (borrarTodo) {
        //proceder a borrar todo
      } else {
        //solo borrar el perfil o cambiar todos los datos
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
}
