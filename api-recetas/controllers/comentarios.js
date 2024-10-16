import { matchedData } from "express-validator"
import { sequelize } from "../config/mysql.js"
import { verifyToken } from "../helpers/generateToken.js"
import { handleResponse } from "../helpers/handleResponse.js"
import { httpError } from "../helpers/handleErrors.js"
import models from "../models/index.js"

//testear con los nuevos cambios
const getComentarios = async (req, res) => {
  try {
    const { id } = req.params //ID receta
    const coments = await models.Comentario.findAll({
      attributes: [
        "id",
        "idReceta",
        "comentario",
        "createAt",
        [sequelize.fn("COUNT", sequelize.col("respuestas.id")), "haveReply"],
      ],
      include: [
        {
          model: models.Usuario.scope("basicUserData"),
          attributes: ["nombres", "apellidos", "usuario", "imagen"],
          required: true,
        },
        {
          model: models.Respuesta,
          attributes: [],
          required: false,
        },
      ],
      where: {
        idReceta: id,
      },
      group: ["comentarios.id", "usuario.id"],
      order: [["createAt", "DESC"]],
    })
    if (coments) {
      handleResponse(res, 200, "Todos los comentarios", coments)
      return
    } else {
      handleResponse(res, 204, "Aun no hay comentarios", coments)
      return
    }
  } catch (error) {
    httpError(res, error)
    return
  }
}

//rehacer esta wea de controlador
const getRespuestas = async (req, res) => {
  try {
    const { id } = req.params //ID comentario
    const respuestas = await models.Respuesta.findAll({
      attributes: {
        exclude: ["idUsuario"],
      },
      include: [
        {
          model: models.Usuario.scope("basicUserData"),
          required: true,
          as: "usuario",
        },
        {
          model: models.Usuario.scope("basicUserData"),
          required: true,
          as: "mension",
        },
      ],
      where: { idComentario: id },
      order: [["createAt", "ASC"]],
    })

    if (respuestas.length) {
      handleResponse(
        res,
        200,
        "Respuestas escritas al comentario solicitado",
        respuestas
      )
      return
    } else {
      handleResponse(
        res,
        204,
        "Supongo que no hay respuestas al comentario solicitado",
        respuestas
      )
      return
    }
  } catch (error) {
    httpError(res, error)
    return
  }
}

const createComentario = async (req, res) => {
  try {
    const today = new Date()
    const token = req.headers.authorization.split(" ").pop()
    const usuario = await verifyToken(token)
    const { id } = req.params
    const body = matchedData(req)
    const comentario = await models.Comentario.create({
      idReceta: id,
      idUsuario: usuario.id,
      comentario: body.comentario,
      createAt: today.toISOString(),
    })
    if (comentario) {
      handleResponse(res, 200, "Comentario guardado", comentario)
      return
    } else {
      handleResponse(res, 400, "Algo malio sal", comentario)
      return
    }
  } catch (error) {
    httpError(res, error)
    return
  }
}

const deleteComentario = async (req, res) => {
  try {
    const { id } = req.params
    const token = req.headers.authorization.split(" ").pop()
    const usuario = await verifyToken(token)
    const result = await models.Comentario.destroy({
      force: true,
      where: {
        id: id,
        idUsuario: usuario.id,
      },
    })
    if (result) {
      handleResponse(res, 200, "Comentario borrado", result)
      return
    } else {
      handleResponse(
        res,
        400,
        "El comentario no fue eliminado, porque no le pertence",
        result
      )
      return
    }
  } catch (error) {
    httpError(res, error)
    return
  }
}

const createRespuesta = async (req, res) => {
  try {
    const today = new Date()
    const token = req.headers.authorization.split(" ").pop()
    const usuario = await verifyToken(token)
    const { id } = req.params
    const { respuesta, mension } = matchedData(req)
    const usuarioMension = await models.Usuario.findOne({
      where: { usuario: mension },
    })
    if (usuarioMension) {
      // handleResponse(res, 200, "Respuesta a comentario guardado", usuarioMension)
      // return
      const result = await models.Respuesta.create({
        idComentario: id,
        idUsuario: usuario.id,
        idUsuarioMension: usuarioMension.id, //cambiar
        respuesta: respuesta,
        createAt: today.toISOString(),
      })
      if (result) {
        handleResponse(res, 200, "Respuesta a comentario guardado", result)
        return
      } else {
        handleResponse(res, 400, "Algo malio sal", result)
        return
      }
    } else {
      handleResponse(res, 400, "El usuario mensionado no existe", result)
      return
    }
  } catch (error) {
    httpError(res, error)
    return
  }
}

const deleteRespuesta = async (req, res) => {
  try {
    const { id } = req.params
    const token = req.headers.authorization.split(" ").pop()
    const usuario = await verifyToken(token)
    const result = await models.Respuesta.destroy({
      force: true,
      where: {
        id: id,
        idUsuario: usuario.id,
      },
    })
    if (result) {
      handleResponse(res, 200, "Comentario (respuesta) borrado", result)
      return
    } else {
      handleResponse(
        res,
        400,
        "El comentario (respuesta) no fue eliminado, porque no le pertence",
        result
      )
      return
    }
  } catch (error) {
    httpError(res, error)
    return
  }
}

export {
  getComentarios,
  getRespuestas,
  createComentario,
  deleteComentario,
  createRespuesta,
  deleteRespuesta,
}
