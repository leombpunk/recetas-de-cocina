import { handleResponse } from "../helpers/handleResponse.js"
import { httpError } from "../helpers/handleErrors.js"
import { verifyToken } from "../helpers/generateToken.js"
import models from "../models/index.js"
import { Op } from "sequelize"
import { sequelize } from "../config/mysql.js"

const getAllSaves = async (req, res) => {
  try {
    //paginado y filtro para busquedas
    //pero primero la consulta normal
    const { search, page, order, saved } = req.query
    const token = req.headers.authorization.split(" ").pop()
    const usuario = await verifyToken(token)
    const limit = 10
    const offset = limit * (page ? page - 1 : 0)
    const orderOptions = [
      ["createAt", order ? order : "ASC"], //para ordenar por fecha asc o desc
      [sequelize.col("receta.titulo"), "ASC"], //ASC a-z DESC z-a
    ]
    const { count, rows } = await models.SaveRecipe.findAndCountAll({
      include: [
        {
          model: models.Receta.scope("publicData"),
          required: true,
          include: [
            { model: models.Usuario.scope("basicUserData"), required: true },
          ],
        },
      ],
      where: {
        [Op.and]: [
          { idUsuario: usuario.id },
          search && {
            "$receta.titulo$": { [Op.like]: `%${search ? search : ""}%` },
          },
        ],
      },
      order: orderOptions,
      offset: offset,
      limit: limit,
    })
    if (count) {
      handleResponse(res, 200, "Resultado obtenido, recetas guardadas", {
        total_pages: Math.ceil(count / limit),
        total_rows: count,
        results: rows,
      })
      return
    } else {
      handleResponse(res, 204, "No hay recetas guardadas") //si, ya se que el codigo 204 no retorna nada, con lo cual el mensaje es omitido
      return
    }
  } catch (error) {
    httpError(res, error)
    return
  }
}

const createSave = async (req, res) => {
  try {
    const today = new Date()
    const { id } = req.params
    const token = req.headers.authorization.split(" ").pop()
    const usuario = await verifyToken(token)
    const result = await models.SaveRecipe.create({
      idReceta: id,
      idUsuario: usuario.id,
      createAt: today.toISOString(),
    })
    if (result) {
      handleResponse(res, 200, "Receta guardada", result)
      return
    } else {
      handleResponse(res, 400, "No se guardo la receta", null)
      return
    }
  } catch (error) {
    httpError(res, error)
    return
  }
}

const deleteSave = async (req, res) => {
  try {
    const { id } = req.params
    const token = req.headers.authorization.split(" ").pop()
    const usuario = await verifyToken(token)
    const result = await models.SaveRecipe.destroy({
      where: { idReceta: id, idUsuario: usuario.id },
      force: true,
    })
    if (result) {
      handleResponse(res, 200, "Elimiando de recetas guardadas", result)
      return
    } else {
      handleResponse(res, 400, "No se puedo eliminar la receta guardada", null)
      return
    }
  } catch (error) {
    httpError(res, error)
    return
  }
}

export { getAllSaves, createSave, deleteSave }
