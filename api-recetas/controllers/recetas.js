import Receta from "../models/receta.js"
import Ingrediente from "../models/ingrediente.js"
import { matchedData } from "express-validator"
import { httpError } from "../helpers/handleErrors.js"
import { sequelize } from "../config/mysql.js"

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

const createReceta = async (req, res) => {
  try {
    const body = matchedData(req)
    const {
      idUsuario,
      titulo,
      detalle,
      duracion,
      comensales,
      visibilidad,
      ingredientes,
      pasos,
    } = body //omito el campo imagen
    const result = await sequelize.transaction(async (t) => {
      const receta = await Receta.create(
        { titulo, detalle, idUsuario, duracion, comensales, visibilidad },
        { transaction: t }
      )
      const idReceta = receta.dataValues.id
      await Ingrediente.create(
        { lista_ingredientes: ingredientes, lista_pasos: pasos, idReceta },
        { transaction: t }
      )
      return Receta.getFullRecetaById(idReceta)
    })
    res.status(201) //el codigo http 201 no retorna ningún dato
    res.send(result)
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