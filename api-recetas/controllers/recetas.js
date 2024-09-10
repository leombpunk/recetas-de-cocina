import { matchedData } from "express-validator"
import Receta from "../models/receta.js"
import { sequelize } from "../config/mysql.js"
import { verifyToken } from "../helpers/generateToken.js"
import { handleResponse } from "../helpers/handleResponse.js"
import { httpError } from "../helpers/handleErrors.js"

const getFullRecetaById = async (req, res) => {
  try {
    const id = req.params.id
    const result = await Receta.getFullRecetaById(id)
    if (result) {
      const status = 200
      const message = ''
      handleResponse(res, status, message, result)
      return
    } 
    else {
      const status = 404
      const message = 'La receta solicitada no existe'
      handleResponse(res, status, message, null)
      return
    }
  } catch (error) {
    httpError(res, error)
    return
  }
}

const getRecetasByUsername = async (req, res) => {
  try {
    const nombreUsuario = req.params.nombreUsuario
    const result = await Receta.getFullRecetaByUsername(nombreUsuario)
    if (result) {
      const status = 200
      const message = ''
      handleResponse(res, status, message, result)
      return
    } 
    else {
      const status = 404
      const message = 'La receta solicitada no existe'
      handleResponse(res, status, message, null)
      return
    }
  } catch (error) {
    httpError(res, error)
    return
  }
}

// const createReceta = async (req, res) => {
//   try {
//     const body = matchedData(req)
//     const {
//       idUsuario,
//       titulo,
//       detalle,
//       duracion,
//       comensales,
//       visibilidad,
//       ingredientes,
//       pasos,
//     } = body //omito el campo imagen
//     const result = await sequelize.transaction(async (t) => {
//       const receta = await Receta.create(
//         { titulo, detalle, idUsuario, duracion, comensales, visibilidad },
//         { transaction: t }
//       )
//       const idReceta = receta.dataValues.id
//       await Ingrediente.create(
//         { lista_ingredientes: ingredientes, lista_pasos: pasos, idReceta },
//         { transaction: t }
//       )
//       return Receta.getFullRecetaById(idReceta)
//     })
//     res.status(201) //el codigo http 201 no retorna ningún dato
//     res.send(result)
//   } catch (error) {
//     httpError(res, error)
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
    const receta = await Receta.findOne({
      where: { idUsuario: tokenData.id, checked: 0 },
    })
    if (receta) {
      const status = 200
      const message = ""
      receta.ingredientes = JSON.parse(receta.ingredientes);
      receta.pasos = JSON.parse(receta.pasos);
      handleResponse(res, status, message, receta)
      return
    } else {
      const result = await sequelize.transaction(async (t) => {
        const receta = await Receta.create(
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
            pasos
          },
          { transaction: t }
        )
        return receta
      })
      const status = 200
      const message = ""
      result.ingredientes = JSON.parse(result.ingredientes);
      result.pasos = JSON.parse(result.pasos);
      handleResponse(res, status, message, result)
      return
    }
  } catch (error) {
    httpError(res, error)
  }
}

const updateReceta = async (req, res) => {
  try {
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
      checked = "",
    } = body //omito el campo imagen
    const result = await sequelize.transaction(async (t) => {
      await Receta.update(
        { titulo, detalle, idUsuario, visibilidad, comensales, duracion },
        { transaction: t, where: { id: idReceta } }
      )
      return Receta.getFullRecetaById(idReceta)
    })
    res.status(200)
    res.send(result)
  } catch (error) {
    httpError(res, error)
  }
}

const deleteReceta = async (req, res) => {
  try {
    //borrar tambien las imágenes relacionadas
    const idReceta = req.params.id
    const result = await sequelize.transaction(async (t) => {
      await Receta.destroy({
        transaction: t,
        where: { id: idReceta },
        force: true,
      })
    })
    res.status(200)
    res.send(result) //a ver que hará
  } catch (error) {
    httpError(res, error)
  }
}

export {
  getFullRecetaById,
  getRecetasByUsername,
  createReceta,
  updateReceta,
  deleteReceta,
}
