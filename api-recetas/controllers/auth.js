import Usuario from '../models/usuario.js'
import { matchedData } from 'express-validator'
import { httpError } from '../helpers/handleErrors.js'
import { tokenSign } from '../helpers/generateToken.js'
import { encrypt, compare } from '../helpers/handleBcrypt.js'
import { sequelize } from '../config/mysql.js'

const login = async (req, res) => {
    try {
        req = matchedData(req)
        const { usuario, contrasena } = req
        const result = await Usuario.getUsuarioByUserwPass(usuario)
        console.log(result)
        const checkPass = await compare(contrasena, result.contrasena)
        if (result && checkPass) {
            console.log('si')
            const token = await tokenSign(result)
            res.send({...result.dataValues, token:token, contrasena: ''})
            return
        }
        else {
            res.status(404)
            res.send({
                error: 'User not found'
            })
            return
        }
    } catch (error) {
        httpError(res, error)
    }
}

const registro = async (req, res) => {
    try {
        req = matchedData(req)
        const { usuario, contrasena, mail } = req
        const contraHash = await encrypt(contrasena)
        const result = await sequelize.transaction(async (t) => {
            const { id } = await Usuario.create({ usuario, contrasena: contraHash, mail }, { transaction: t })
            return await Usuario.findOne({ where: { id: id }})
        })
        res.status(201).send(result)
    } catch (error) {
        httpError(res, error)
    }
}

const logout = async (req, res) => {
    // nones
}

export { login, logout, registro }