import { matchedData } from "express-validator"
import { httpError } from "../helpers/handleErrors.js"
import { handleResponse } from "../helpers/handleResponse.js"
import { tokenSign, verifyToken } from "../helpers/generateToken.js"
import { encrypt, compare } from "../helpers/handleBcrypt.js"
import models from "../models/index.js"

const login = async (req, res) => {
  try {
    const body = matchedData(req)
    const { usuario, contrasena } = body
    const result = await models.Usuario.getUsuarioByUserwPass(usuario)
    console.log(result)
    if (!result) {
      handleResponse(res, 404, "User not found")
      return
    }

    const checkPass = await compare(contrasena, result.contrasena)
    if (checkPass) {
      const token = await tokenSign(result)
      delete result.dataValues.id
      delete result.dataValues.contrasena
      const data = { ...result.dataValues, token: token }
      handleResponse(res, 200, "", data)
      return
    } else {
      handleResponse(res, 404, "Usuario o contrasseña no válidos")
      return
    }
  } catch (error) {
    httpError(res, error)
    return
  }
}

const registro = async (req, res) => {
  try {
    const today = new Date()
    const body = matchedData(req)
    const { usuario, contrasena, mail } = body
    const contraHash = await encrypt(contrasena)

    const user = await models.Usuario.create({
      nombres: "",
      apellidos: "",
      usuario,
      contrasena: contraHash,
      mail,
      createAt: today.toISOString(),
    })

    if (user) {
      const token = await tokenSign(user)
      delete user.dataValues.id
      delete user.dataValues.contrasena
      const data = { ...user.dataValues, token: token }
      handleResponse(res, 201, "Usuario registrado correctamente", data)
      return

    } else {
      handleResponse(res, 400, "Ha ocurrido un problema al crear el usuario, intentalo mas tarde", user)
      return
    }
  } catch (error) {
    httpError(res, error)
    return
  }
}

const googleOAuth = async (req, res) => {
  //la wea del passport

}

const callbackGoogleOAuth = async (req, res) => {
  //la wea callback
  console.log({req})
  res.redirect(`http://localhost:3000/login?token=${req.user.token}`);
}

const refreshUserData = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ").pop()
    const tokenData = await verifyToken(token)

    const result = await models.Usuario.findOne({
      where: { id: tokenData.id /*usuario: tokenData.usuario*/ }, //si actualizo el nombre de usuario de un perfil el where no encontrará al usuario
    })
    console.log(result)
    if (!result) {
      handleResponse(res, 404, "User not found")
      return
    } else {
      const newToken = await tokenSign(result)
      delete result.dataValues.id
      const data = { ...result.dataValues, token: newToken }
      handleResponse(res, 200, "", data)
      return
    }
  } catch (error) {
    httpError(res, error)
    return
  }
}

const logout = async (req, res) => {
  // nones
}

export { login, logout, registro, refreshUserData, googleOAuth, callbackGoogleOAuth }
