import fs from "fs"
import { fileURLToPath } from "url"
import { dirname, join } from "path"
import { Op } from "sequelize"
import { matchedData } from "express-validator"
import { sequelize } from "../config/mysql.js"
import { verifyToken } from "../helpers/generateToken.js"
import { handleResponse } from "../helpers/handleResponse.js"
import { httpError } from "../helpers/handleErrors.js"
// import Receta from "../models/receta.js"
// import Archivo from "../models/archivos.js"
// import Usuario from "../models/usuario.js"
import models from "../models/index.js"

const publicPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "../public/images/recipes"
)

//endpoints publicos
const getAllRecetasPublic = async (req, res) => {
  try {
    const { search, username, page, order, likes, publicated } = req.query
    const limit = 10
    const offset = limit * (page ? page -1 : 0)
    const whereOptions = {
      [Op.and]: [
        { visibilidad: 1 },
        { titulo: { [Op.like]: `%${search || ""}%` } },
        username && { '$usuario.usuario$': username },
      ],
    }
    const orderOptions = [
      ["titulo", order ? order : "ASC"], //ASC a-z DESC z-a
      // ["likes", likes ? likes : "ASC"],
      // ["updateAt", publicated ? publicated : "ASC"],
    ]
    // console.log({ equisde: orderOptions })

    const { count, rows } = await models.Receta.scope("publicData").findAndCountAll({
      include: {
        model: Usuario.scope("basicUserData"),
        required: true,
        // where: username && { usuario: username },
      },
      where: whereOptions,
      order: orderOptions,
      limit: limit,
      offset: offset,
    })

    if (count) {
      handleResponse(res, 200, "Resultado obtenido", {
        total_pages: Math.ceil(count / limit),
        total_rows: count,
        results: rows,
      })
      return
    } else {
      handleResponse(res, 204, "No hay resultados")
      return
    }
  } catch (error) {
    httpError(res, error)
    return
  }
}

const getRecetaPublic = async (req, res) => {
  try {
    const { id } = req.params
    const result = await models.Receta.findByPk(id, {
      include: { model: models.Usuario.scope("basicUserData"), required: true },
    })
    if (result) {
      result.ingredientes = JSON.parse(result.ingredientes)
      result.pasos = JSON.parse(result.pasos)
      handleResponse(res, 200, "Datos de la receta", result)
      return
    } else {
      handleResponse(res, 204, "La receta no existe", result) //si, ya se que el codigo 204 no retorna nada, con lo cual el mensaje es omitido
      return
    }
  } catch (error) {
    httpError(res, error)
    return
  }
}

//endpoints privados
const getAllRecetas = async (req, res) => {
  try {
    const { search, page, order, likes, publicated } = req.query
    const token = req.headers.authorization.split(" ").pop()
    const usuario = await verifyToken(token)
    const limit = 10
    const offset = limit * (page ? page - 1 : 0)
    const orderOptions = [
      ["titulo", order ? order : "ASC"], //ASC a-z DESC z-a
      // ["likes", likes ? likes : "ASC"],
      // ["updateAt", publicated ? publicated : "ASC"],
    ]
    const { count, rows } = await models.Receta.findAndCountAll({
      where: {
        [Op.and]: [
          { idUsuario: usuario.id },
          { titulo: { [Op.like]: `%${search || ""}%` } },
        ],
      },
      order: orderOptions,
      offset: offset,
      limit: limit,
    })
    if (count) {
      handleResponse(res, 200, "Resultado obtenido", {
        total_pages: Math.ceil(count / limit),
        total_rows: count,
        results: rows,
      })
      return
    } else {
      handleResponse(res, 204, "No hay recetas") //si, ya se que el codigo 204 no retorna nada, con lo cual el mensaje es omitido
      return
    }
  } catch (error) {
    httpError(res, error)
    return
  }
}

const getReceta = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ").pop()
    const usuario = await verifyToken(token)
    const { id } = req.params
    const result = await models.Receta.findByPk(id, {
      where: { idUsuario: usuario.id },
    })
    if (result) {
      result.ingredientes = JSON.parse(result.ingredientes)
      result.pasos = JSON.parse(result.pasos)
      handleResponse(res, 200, "Datos de la receta", result)
      return
    } else {
      handleResponse(res, 204, "", result)
      return
    }
  } catch (error) {
    httpError(res, error)
    return
  }
}

// const getFullRecetaById = async (req, res) => {
//   try {
//     const id = req.params.id
//     const result = await Receta.getFullRecetaById(id)
//     if (result) {
//       const status = 200
//       const message = ""
//       handleResponse(res, status, message, result)
//       return
//     } else {
//       const status = 404
//       const message = "La receta solicitada no existe"
//       handleResponse(res, status, message, null)
//       return
//     }
//   } catch (error) {
//     httpError(res, error)
//     return
//   }
// }

// const getRecetasByUsername = async (req, res) => {
//   try {
//     const nombreUsuario = req.params.nombreUsuario
//     const result = await Receta.getFullRecetaByUsername(nombreUsuario)
//     if (result) {
//       const status = 200
//       const message = ""
//       handleResponse(res, status, message, result)
//       return
//     } else {
//       const status = 404
//       const message = "La receta solicitada no existe"
//       handleResponse(res, status, message, null)
//       return
//     }
//   } catch (error) {
//     httpError(res, error)
//     return
//   }
// }

const createReceta = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ").pop()
    const tokenData = await verifyToken(token)
    const body = matchedData(req)
    const {
      titulo = "",
      detalle = "",
      duracion = "",
      comensales = "",
      visibilidad = 0,
      ingredientes = [],
      pasos = [],
      imagen = "",
      checked = "",
    } = body
    const receta = await models.Receta.findOne({
      where: { idUsuario: tokenData.id, checked: 0 },
    })
    if (receta) {
      const status = 200
      const message = ""
      receta.ingredientes = JSON.parse(receta.ingredientes)
      receta.pasos = JSON.parse(receta.pasos)
      handleResponse(res, status, message, receta)
      return
    } else {
      const result = await sequelize.transaction(async (t) => {
        const receta = await models.Receta.create(
          {
            titulo,
            detalle,
            idUsuario: tokenData.id,
            duracion,
            comensales,
            visibilidad,
            imagen,
            checked: 0,
            ingredientes,
            pasos,
          },
          { transaction: t }
        )
        return receta
      })
      const status = 200
      const message = ""
      result.ingredientes = JSON.parse(result.ingredientes)
      result.pasos = JSON.parse(result.pasos)
      handleResponse(res, status, message, result)
      return
    }
  } catch (error) {
    httpError(res, error)
    return
  }
}

const updateReceta = async (req, res) => {
  try {
    //tiene que si o si validar que todos los cmapos esten correctos
    const idReceta = req.params.id
    const body = matchedData(req)
    const {
      titulo = "",
      detalle = "",
      duracion = "",
      comensales = "",
      visibilidad = 0,
      ingredientes = [],
      pasos = [],
      imagen = "",
      checked = 0,
    } = body
    const result = await models.Receta.update(
      {
        titulo,
        detalle,
        visibilidad,
        comensales,
        duracion,
        ingredientes,
        pasos,
        imagen,
        checked: 1,
      },
      { where: { id: idReceta } }
    )
    console.log({ result: result }) //retorna 1 cuando actualizo, 0 cuando no hubo falta actaulizar
    if (result) {
      handleResponse(res, 200, "Receta actualizada", result)
      return
    } else {
      handleResponse(res, 404, "Algo malió sal!", result)
      return
    }
  } catch (error) {
    console.log(error)
    httpError(res, error)
    return
  }
}

const deleteReceta = async (req, res) => {
  try {
    //borrar tambien las imágenes relacionadas
    const token = req.headers.authorization.split(" ").pop()
    const usuario = await verifyToken(token)
    const idReceta = req.params.id
    const date = new Date()
    //buscar la receta
    const receta = await models.Receta.findOne({ where: { id: idReceta } })
    receta.ingredientes = JSON.parse(receta.ingredientes)
    receta.pasos = JSON.parse(receta.pasos)
    //capturar las imágenes
    if (receta) {
      let files = [] //archivos a borrar
      if (receta.imagen !== "") {
        files.push(receta.imagen)
      }
      receta.pasos.forEach((value) => {
        if (value.imagen !== "") {
          files.push(value.imagen)
        }
      })
      console.log({ weas: files })
      //borrar las imágenes
      files.forEach(async (filename) => {
        fs.unlink(`${publicPath}/${filename}`, (error) => {
          if (error) {
            // throw new Error("El archivo que desea borrar no existe")
            httpError(res, { message: "No es posible borrar la receta" })
            return
          } else {
            console.log("cb: mensaje del metodo fs.unlink equisde")
          }
        })
        //actualizar la tabla de archivos
        const archivos = await models.Archivo.update(
          { deleteAt: date.toISOString() },
          { where: { idUsuario: usuario.id, imagen: filename } }
        )
        console.log({ arch: archivos })
      })
      //borrar la receta
      const result = await models.Receta.destroy({
        where: { id: idReceta },
        force: true,
      })
      console.log({ resultado: result })
      //informar el resultado
      if (result) {
        handleResponse(res, 200, "Receta eliminada", result)
        return
      } else {
        handleResponse(res, 404, "Algo malio sal!", result)
        return
      }
    } else {
      handleResponse(res, 404, "La receta no existe", null)
      return
    }
  } catch (error) {
    console.log(error)
    httpError(res, error)
    return
  }
}

//falta terminar este endpoint
const updateVisibilidad = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ").pop()
    const usuario = await verifyToken(token)
    const body = matchedData(req)
    const filtroPublic = body.recetas.filter((value) => value.visibilidad)
    const filtroPrivate = body.recetas.filter((value) => !value.visibilidad)
    const idsPublic = filtroPublic.map((value) => value.id)
    const idsPrivate = filtroPrivate.map((value) => value.id)
    // console.log({ public: idsPublic, private: idsPrivate, user: usuario })
    const result = await sequelize.transaction(async (t) => {
      const publicResult = await models.Receta.update(
        { visibilidad: 1 },
        {
          where: {
            [Op.and]: [
              { id: { [Op.in]: idsPublic } },
              { idUsuario: usuario.id },
            ],
          },
          transaction: t,
        }
      )
      const privateResult = await models.Receta.update(
        { visibilidad: 0 },
        {
          where: {
            [Op.and]: [
              { id: { [Op.in]: idsPrivate } },
              { idUsuario: usuario.id },
            ],
          },
          transaction: t,
        }
      )

      return [publicResult, privateResult]
    })
    // console.log({ resultado: result })
    handleResponse(res, 200, "Acceso a recetas actualizado", result)
    return
  } catch (error) {
    // console.log(error)
    httpError(res, error)
    return
  }
}

export {
  //publicos
  getAllRecetasPublic,
  getRecetaPublic,
  //privados
  // getFullRecetaById,
  // getRecetasByUsername,
  getAllRecetas,
  getReceta,
  createReceta,
  updateReceta,
  deleteReceta,
  updateVisibilidad,
}
