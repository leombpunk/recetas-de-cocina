import { Op } from "sequelize"
import { verifyToken } from "../helpers/generateToken.js"
import { httpError } from "../helpers/handleErrors.js"
import { handleResponse } from "../helpers/handleResponse.js"
import models from "../models/index.js"

const getLikes = async (req, res) => {
  try {
    const { id } = req.params
    const cantidadLikes = await models.Like.count({
      where: {
        idReceta: id,
      },
    })
    handleResponse(res, 200, `Cantidad de likes para la receta con id: ${id}`, {
      total_likes: cantidadLikes,
    })
    return
  } catch (error) {
    httpError(res, error)
    return
  }
}

const getLikesDetails = async (req, res) => {
  try {
    const { id } = req.params
    const usuarios = await models.Like.findAll({
      include: { model: models.Usuario.scope("basicUserData"), required: true },
      where: {
        idReceta: id,
      },
    })
    handleResponse(
      res,
      200,
      `Usuarios que dieron like a la receta con id: ${id}`,
      {
        users: usuarios,
      }
    )
    return
  } catch (error) {
    httpError(res, error)
    return
  }
}

const createLike = async (req, res) => {
  try {
    const today = new Date()
    const token = req.headers.authorization.split(" ").pop()
    const usuario = await verifyToken(token)
    const { id } = req.params
    const like = await models.Like.create({
      idReceta: id,
      idUsuario: usuario.id,
      createAt: today.toISOString(),
    })
    if (like) {
      handleResponse(res, 200, "Like guardado", like)
      return
    } else {
      handleResponse(res, 400, `Algo malio sal`, like)
      return
    }
  } catch (error) {
    httpError(res, error)
    return
  }
}

const deteleLike = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ").pop()
    const usuario = await verifyToken(token)
    const like = await models.Like.destroy({
      where: { [Op.and]: [{ idReceta: id }, { idUsuario: usuario.id }] },
      force: true,
    })
    if (like) {
      handleResponse(res, 200, "Like eliminado", like)
      return
    } else {
      handleResponse(res, 400, `Algo malio sal`, like)
      return
    }
  } catch (error) {
    httpError(res, error)
    return
  }
}

export { getLikes, getLikesDetails, createLike, deteleLike }
