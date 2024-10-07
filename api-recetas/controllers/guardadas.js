import { handleResponse } from "../helpers/handleResponse.js"
import { httpError } from "../helpers/handleErrors.js"
import { verifyToken } from "../helpers/generateToken.js"
import models from "../models/index.js"

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

export { createSave, deleteSave }
