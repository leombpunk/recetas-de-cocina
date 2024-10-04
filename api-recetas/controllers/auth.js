import { matchedData } from "express-validator"
import { sequelize } from "../config/mysql.js"
// import Usuario from "../models/usuario.js"
import models from "../models/index.js"
import { httpError } from "../helpers/handleErrors.js"
import { tokenSign, verifyToken } from "../helpers/generateToken.js"
import { encrypt, compare } from "../helpers/handleBcrypt.js"
import { handleResponse } from "../helpers/handleResponse.js"

const login = async (req, res) => {
  try {
    req = matchedData(req)
    const { usuario, contrasena } = req
    const result = await models.Usuario.getUsuarioByUserwPass(usuario)
    console.log(result)
    if (!result) {
      const status = 404
      const message = "User not found"
      handleResponse(res, status, message)
    }

    const checkPass = await compare(contrasena, result.contrasena)
    if (checkPass) {
      const token = await tokenSign(result)
      const status = 200
      const message = ""
      delete result.dataValues.id
      delete result.dataValues.contrasena
      const data = { ...result.dataValues, token: token }
      handleResponse(res, status, message, data)
    } else {
      const status = 404
      const message = "Credentials not valid"
      handleResponse(res, status, message)
    }
  } catch (error) {
    httpError(res, error)
  }
}

const registro = async (req, res) => {
  try {
    req = matchedData(req)
    const { nombres, apellidos, usuario, contrasena, mail } = req
    const contraHash = await encrypt(contrasena)
    const result = await sequelize.transaction(async (t) => {
      const { id } = await models.Usuario.create(
        { nombres, apellidos, usuario, contrasena: contraHash, mail },
        { transaction: t }
      )
      return await Usuario.findOne({ where: { id: id } })
    })
    const status = 201
    const message = "User registrer done"
    const data = result
    handleResponse(res, status, message, data)
  } catch (error) {
    httpError(res, error)
  }
}

const registroGoogle = async (req, res) => {}

const refreshUserData = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ").pop()
    const tokenData = await verifyToken(token)

    const result = await models.Usuario.findOne({
      where: { id: tokenData.id, usuario: tokenData.usuario },
    })
    console.log(result)
    if (!result) {
      const status = 404
      const message = "User not found"
      handleResponse(res, status, message)
    } else {
      const newToken = await tokenSign(result)
      const status = 200
      const message = ""
      delete result.dataValues.id
      const data = { ...result.dataValues, token: newToken }
      handleResponse(res, status, message, data)
    }
  } catch (error) {
    httpError(res, error)
  }
}

const logout = async (req, res) => {
  // nones
}

export { login, logout, registro, refreshUserData }
