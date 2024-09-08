import { matchedData } from "express-validator"
import Receta from "../models/receta.js"
import { sequelize } from "../config/mysql.js"
import Ingrediente from "../models/ingrediente.js"
import { verifyToken } from "../helpers/generateToken.js"
import { handleResponse } from "../helpers/handleResponse.js"
import { httpError } from "../helpers/handleErrors.js"

const getFullRecetaById = async (req, res) => {
  try {
    const id = req.params.id
    await Receta.getFullRecetaById(id)
      .then((result) => {
        res.send(result)
      })
      .catch((error) => {
        res.status(500)
        res.send({ errors: error.erros })
      })
  } catch (error) {
    httpError(res, error)
  }
}

const getRecetasByUsername = async (req, res) => {
  try {
    const nombreUsuario = req.params.nombreUsuario
    await Receta.getFullRecetaByUsername(nombreUsuario)
      .then((result) => {
        res.send(result)
      })
      .catch((error) => {
        res.status(500)
        res.send({ errors: error.erros })
      })
  } catch (error) {
    httpError(res, error)
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
    //sacar idUsuario del token
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
    } = body
    // console.log({
    //   titulo,
    //   detalle,
    //   duracion,
    //   comensales,
    //   visibilidad,
    //   ingredientes,
    //   imagen,
    //   pasos,
    // })
    //antes de crear una nueva entrada, verificar que no exista una receta sin
    //terminar, o sea con los campos en blanco, así en la db no dejo los campos nulos,
    //solo la validacion en el controlador acepataria campos vacios
    const check = await Receta.findOne({
      where: { idUsuario: tokenData.id, checked: 0 },
      include: { model: Ingrediente, required: true },
    })
    if (check) {
      // console.log(check)
      const status = 200
      const message = ""
      handleResponse(res, status, message, check)
      return
    } else {
      //crear la entrada de la receta con los datos recibidos
      // console.log(check)
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
          },
          { transaction: t }
        )
        const idReceta = receta.dataValues.id
        const ingrediente = await Ingrediente.create(
          { lista_ingredientes: ingredientes, lista_pasos: pasos, idReceta },
          { transaction: t }
        )
        // console.log({receta:receta, ingredientes:ingrediente})
        return { ...receta.dataValues, ingredientes: ingrediente }
      })
      const status = 200
      const message = ""
      handleResponse(res, status, message, result)
      return
      // res.send({ message: "ola k ase!" })
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
      idUsuario,
      titulo,
      detalle,
      visibilidad,
      comensales,
      duracion,
      ingredientes,
      pasos,
    } = body //omito el campo imagen
    const result = await sequelize.transaction(async (t) => {
      await Receta.update(
        { titulo, detalle, idUsuario, visibilidad, comensales, duracion },
        { transaction: t, where: { id: idReceta } }
      )
      // await Ingrediente.destroy({
      //   transaction: t,
      //   where: { idReceta: idReceta },
      //   force: true,
      // }) //sin la prop 'force' hace un soft-delete por defecto
      await Ingrediente.update(
        { lista_ingredientes: ingredientes, lista_pasos: pasos },
        { transaction: t, where: { idReceta: idReceta } }
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
    const idReceta = req.params.id
    const result = await sequelize.transaction(async (t) => {
      await Ingrediente.destroy({
        transaction: t,
        where: { idReceta: idReceta },
        force: true,
      })
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
