import multer from "multer"
import express from "express"
import fs from "fs"
import { dirname, join } from "path"
import { fileURLToPath } from "url"
// import Usuario from "../models/usuario.js"
// import Archivo from "../models/archivos.js"
import models from "../models/index.js"
import { verifyToken } from "../helpers/generateToken.js"
import { handleResponse } from "../helpers/handleResponse.js"
import { httpError } from "../helpers/handleErrors.js"
import { upload, uploadAvatar } from "../middlewares/almacenamiento.js"
import { Op } from "sequelize"

const publicPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "../public/images/recipes"
)

const publicPathAvatar = join(
  dirname(fileURLToPath(import.meta.url)),
  "../public/images/avatars"
)

const publicFolder = express.static(
  join(dirname(fileURLToPath(import.meta.url)), "../public/images/recipes")
)

const uploader = upload.single("file")
const uploaderAvatar = uploadAvatar.single("file")

// Usuarios
//modificar un poco el endpoint para subir y eliminar imagenes de perfil o avatares
const uploadProfileImg = async (req, res) => {
  try {
    uploaderAvatar(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        console.log(err)
        // A Multer error occurred when uploading.
        handleResponse(res, 404, err.message)
        return
      } else if (err) {
        // console.log(err)
        // An unknown error occurred when uploading.
        handleResponse(res, 404, err.message)
        return
      }

      if (req.file) {
        const token = req.headers.authorization.split(" ").pop()
        const usuario = await verifyToken(token)
        const { filename, size, mimetype, encoding } = req.file
        const path = `http://localhost:3001/avatar/${filename}`
        //comprobar si existe algun archivo que borrar
        const exist = await models.Usuario.findOne({
          where: { id: usuario.id },
        })
        if (exist) {
          if (exist.imagen) {
            fs.unlink(`${publicPathAvatar}/${exist.imagen}`, (error) => {
              if (error) throw error
              else console.log("cb: mensaje del metodo fs.unlink2")
            })
          }
          exist.imagen = filename
          exist.save({ fields: ["imagen"] })
          // const avatar = await models.Usuario.update(
          //   {
          //     imagen: filename,
          //   },
          //   { where: { id: usuario.id } }
          // )
          // console.log(archivo)
          if (/*avatar*/ exist.changed()) {
            //si se pudo guardar enviar el mensaje de imagen guardada
            handleResponse(res, 200, "Imagen de perfil actualizada", {
              file: { filename, size, mimetype, encoding, path },
            })
            return
          } else {
            //si no se pudo, informar y eliminar el archivo guardado con multer
            fs.unlink(`${publicPathAvatar}/${filename}`, (error) => {
              if (error) throw error
              else console.log("cb: mensaje del metodo fs.unlink2")
            })
            handleResponse(res, 400, "No se puedo almacenar la imagen")
            return
          }
        } else {
          handleResponse(res, 400, "El usuario no existe")
          return
        }
      } else {
        handleResponse(res, 404, "No hay archivo")
        return
      }
    })
  } catch (error) {
    httpError(res, error)
  }
}

const deleteProfileImg = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ").pop()
    const usuario = await verifyToken(token)
    const { username } = req.params
    const usuarioData = await models.Usuario.findOne({
      where: { id: usuario.id },
    })
    if (usuarioData) {
      const { imagen } = usuarioData
      if (imagen) {
        fs.unlink(`${publicPathAvatar}/${imagen}`, (error) => {
          if (error) throw error
          else console.log("cb: mensaje del metodo fs.unlink")
        })
        usuarioData.imagen = null
        usuarioData.save({ fields: ["imagen"] })
        if (usuarioData.changed()){
          handleResponse(res, 200, "Imagen eliminada")
          return
        }
      } else {
        handleResponse(res, 404,"Imagen no encontrada")
        return
      }
    } else {
      handleResponse(res, 404,"El usuario no existe")
      return
    }
  } catch (error) {
    httpError(res, error)
    return
  }
}

// Recetas
//aplicar esta misma wea cuando un weon sube una foto de perfil
const uploadRecetaImg = async (req, res) => {
  try {
    uploader(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        console.log(err)
        // A Multer error occurred when uploading.
        handleResponse(res, 404, err.message)
        return
      } else if (err) {
        // console.log(err)
        // An unknown error occurred when uploading.
        handleResponse(res, 404, err.message)
        return
      }

      if (req.file) {
        const date = new Date()
        // console.log(date.toISOString())
        const token = req.headers.authorization.split(" ").pop()
        const usuario = await verifyToken(token)
        const { filename, size, mimetype, encoding } = req.file
        const path = `http://localhost:3001/static/${filename}`
        const archivo = await models.Archivo.create({
          idUsuario: usuario.id,
          imagen: filename,
          createAt: date.toISOString(),
        })
        // console.log(archivo)
        if (archivo) {
          //si se pudo guardar enviar el mensaje de imagen guardada
          handleResponse(res, 200, "Imagen guardada", {
            file: { filename, size, mimetype, encoding, path },
          })
          return
        } else {
          //si no se pudo, informar y eliminar el archivo guardado con multer
          fs.unlink(`${publicPath}/${filename}`, (error) => {
            if (error) throw error
            else console.log("cb: mensaje del metodo fs.unlink2")
          })
          handleResponse(res, 400, "No se puedo almacenar la imagen")
          return
        }
      } else {
        handleResponse(res, 404, "No hay archivo")
        return
      }
    })
  } catch (error) {
    httpError(res, error)
  }
}

const deleteRecetaImg = async (req, res) => {
  try {
    const date = new Date()
    const token = req.headers.authorization.split(" ").pop()
    const usuario = await verifyToken(token)
    const { filename } = req.params
    const archivo = await models.Archivo.findOne({
      where: { idUsuario: usuario.id, imagen: filename, deleteAt: null },
    })
    if (archivo) {
      await models.Archivo.update(
        { deleteAt: date.toISOString() },
        { where: { idUsuario: usuario.id, imagen: filename } }
      )
      fs.unlink(`${publicPath}/${filename}`, (error) => {
        if (error) {
          // throw new Error("El archivo que desea borrar no existe")
          httpError(res, { message: "El archivo que desea borrar no existe" })
          return
        } else {
          console.log("cb: mensaje del metodo fs.unlink")
          handleResponse(res, 200, "Imagen eliminada")
          return
        }
      })
    } else {
      handleResponse(res, 404, "El archivo que desea borrar no existe")
      return
    }
  } catch (error) {
    httpError(res, error)
    return
  }
}

export {
  publicFolder,
  uploadProfileImg,
  uploadRecetaImg,
  deleteProfileImg,
  deleteRecetaImg,
}
