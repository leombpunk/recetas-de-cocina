import multer from "multer"
import { extname } from "path"
import models from "../models/index.js"
import { verifyToken } from "../helpers/generateToken.js"
import { handleResponse } from "../helpers/handleResponse.js"
import { httpError } from "../helpers/handleErrors.js"
import { upload } from "../middlewares/almacenamiento.js"
import { deleteFile, uploadFile } from "../helpers/fileStorage.js"

const uploader = upload.single("file")

// Usuarios
//modificar un poco el endpoint para subir y eliminar imagenes de perfil o avatares
const uploadProfileImg = async (req, res) => {
  try {
    await uploader(req, res, async function (err) {
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
        console.log({ fileCatch: req.file })
        const token = req.headers.authorization.split(" ").pop()
        const usuario = await verifyToken(token)
        const { filename, originalname, size, mimetype, encoding } = req.file
        //comprobar si existe algun archivo que borrar
        const exist = await models.Usuario.scope("withPassword").findOne({
          where: { id: usuario.id },
        })
        if (exist) {
          if (exist.imagen) {
            //recuperar el archivo de la memoria
            const { file } = req
            file.originalname = "avatar".concat("_", usuario.usuario, extname(originalname))
            await uploadFile(exist, file, false)
              .then(async (result) => {
                console.log({result})
                exist.imagen = result.fileId
                exist.urlPublica = result.url
                await exist.save({ fields: ["imagen", "urlPublica"] })
                  handleResponse(res, 200, "Imagen de perfil actualizada", {
                    file: {
                      filename: exist.imagen,
                      size,
                      mimetype,
                      encoding,
                      path: exist.urlPublica,
                    },
                  })
                  return
              })
              .catch((error) => {
                console.log({error})
                handleResponse(res, 400, "No se puedo almacenar la imagen")
                return
              })
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
    return
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
        await deleteFile(usuarioData, imagen)
          .then(async (result) => {
            console.log({result})
            usuarioData.imagen = null
            usuarioData.urlPublica = null
            await usuarioData.save({ fields: ["imagen", "urlPublica"] })
            if (usuarioData.changed()) {
              handleResponse(res, 200, "Imagen eliminada")
              return
            }
          })
          .catch((error) => {
            console.log({error})
            handleResponse(res, 400, "No se puedo eliminar la imagen")
            return
          })
      } else {
        handleResponse(res, 404, "Imagen no encontrada")
        return
      }
    } else {
      handleResponse(res, 404, "El usuario no existe")
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
    await uploader(req, res, async function (err) {
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
        const now = Date.now()
        const token = req.headers.authorization.split(" ").pop()
        const usuario = await verifyToken(token)
        const { filename, originalname, size, mimetype, encoding } = req.file
        const { file } = req
        file.originalname = "receta".concat("_", now, extname(originalname))
        await uploadFile(usuario, file, false)
          .then((result) => {
            console.log({result})
            handleResponse(res, 200, "Imagen guardada", {
              file: {
                filename: result.fileId,
                size,
                mimetype,
                encoding,
                path: result.url,
              },
            })
            return
          })
          .catch((error) => {
            console.log({error})
            handleResponse(res, 400, "No se puedo almacenar la imagen")
            return
          })
        //si se pudo guardar enviar el mensaje de imagen guardada
        return
      } else {
        handleResponse(res, 404, "No hay archivo")
        return
      }
    })
  } catch (error) {
    httpError(res, error)
    return
  }
}

const deleteRecetaImg = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ").pop()
    const usuario = await verifyToken(token)
    const { filename } = req.params
    await deleteFile(usuario, filename)
      .then((result) => {
        console.log({result})
        handleResponse(res, 200, "Imagen eliminada")
        return
      })
      .catch((error) => {
        console.log({error})
        handleResponse(res, 400, "No se puedo eliminar la imagen")
        return
      })
    return
  } catch (error) {
    httpError(res, error)
    return
  }
}

export {
  // publicFolder,
  uploadProfileImg,
  uploadRecetaImg,
  deleteProfileImg,
  deleteRecetaImg,
}
