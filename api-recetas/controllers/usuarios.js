// import Usuario from '../models/usuario.js'
import models from "../models/index.js"
import { matchedData } from 'express-validator'
import { httpError } from '../helpers/handleErrors.js'
import { encrypt } from '../helpers/handleBcrypt.js'

const getUsuario = async (req, res) => {
    try {
        const id = req.params.id
        const usuario = await models.Usuario.findOne({ where: { id: id } })
        res.send(usuario)
    } catch (error) {
        httpError(res, error)
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
        await models.Usuario.update({ usuario, mail }, { where: { id: id }}).then(result => {
            console.log(result)
            if (result[0]) {
                res.status(200).send(req)
            }
            else {
                res.status(200).send({ message: 'Nada para actualizar' })
            }
        }).catch(error => {
            console.log(error)
            res.status(500).send({ message: 'Error al actualizar el perfil de usuario' })
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
        await models.Usuario.update({ contrasena: passEncrypt }, { where: { id: id } }).then(result => {
            console.log(result)
            if (result[0]) {
                res.status(200).send(req)
            }
            else {
                res.status(200).send({ message: 'Nada para actualizar' })
            }
        }).catch(error => {
            console.log(error)
            res.status(500).send({ message: 'Error al actualizar la contraseña' })
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

export { getUsuario, getRecetasByUserId, getRecetasVisiblesByUserId, updateUsuario, deleteUsuario, updateUsuarioPass }