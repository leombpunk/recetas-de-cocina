import { matchedData } from "express-validator"
import { handleResponse } from "../helpers/handleResponse.js"
import { httpError } from "../helpers/handleErrors.js"
import { encrypt } from "../helpers/handleBcrypt.js"
import models from "../models/index.js"

const getUsuario = async (req, res) => {
  try {
    const { usuario } = req.params
    const usuarioData = await models.Usuario.scope("basicUserData").findOne({
      where: { usuario: usuario },
    })
    if (usuarioData) {
      handleResponse(res, 200, "Datos del usuario", usuarioData)
      return
    } else {
      handleResponse(res, 400, "El usaurio no existe")
      return
    }
  } catch (error) {
    httpError(res, error)
    return
  }
}

const getRecetasByUserId = async (req, res) => {
  try {
    const id = req.params.id
    const recetas = await models.Usuario.getRecetasByUserId(id)
    res.send(recetas)
  } catch (error) {
    httpError(res, error)
  }
}

const getRecetasVisiblesByUserId = async (req, res) => {
  try {
    const id = req.params.id
    const recetas = await models.Usuario.getRecetasVisiblesByUserId(id)
    res.send(recetas)
  } catch (error) {
    httpError(res, error)
  }
}

const updateUsuario = async (req, res) => {
  try {
    const id = req.params.id
    req = matchedData(req)
    const { usuario, mail } = req
    await models.Usuario.update({ usuario, mail }, { where: { id: id } })
      .then((result) => {
        console.log(result)
        if (result[0]) {
          res.status(200).send(req)
        } else {
          res.status(200).send({ message: "Nada para actualizar" })
        }
      })
      .catch((error) => {
        console.log(error)
        res
          .status(500)
          .send({ message: "Error al actualizar el perfil de usuario" })
      })
  } catch (error) {
    httpError(res, error)
  }
}

const updateUsuarioPass = async (req, res) => {
  try {
    const id = req.params.id
    req = matchedData(req)
    const { contrasena } = req
    const passEncrypt = encrypt(contrasena)
    await models.Usuario.update(
      { contrasena: passEncrypt },
      { where: { id: id } }
    )
      .then((result) => {
        console.log(result)
        if (result[0]) {
          res.status(200).send(req)
        } else {
          res.status(200).send({ message: "Nada para actualizar" })
        }
      })
      .catch((error) => {
        console.log(error)
        res.status(500).send({ message: "Error al actualizar la contraseña" })
      })
  } catch (error) {
    httpError(res, error)
  }
}

const deleteUsuario = async (req, res) => {
  try {
    const id = req.params.id
    //que hago al borrar un usuario?
    //borro todas sus recetas?
    //o las dejo pero como anonimas?
    //creo que es mejor borrar todas las recetas (e ingredientes) junto al usuario y listo
  } catch (error) {
    httpError(res, error)
  }
}

export {
  getUsuario,
  getRecetasByUserId,
  getRecetasVisiblesByUserId,
  updateUsuario,
  deleteUsuario,
  updateUsuarioPass,
}
