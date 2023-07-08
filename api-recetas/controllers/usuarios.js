import Usuario from '../models/usuario.js'
import { matchedData } from 'express-validator'
import { httpError } from '../helpers/handleErrors.js'

const getUsuario = async (req, res) => {
    try {
        const id = req.params.id
        const usuario = await Usuario.findOne({ where: { id: id } })
        res.send(usuario)
    } catch (error) {
        httpError(res, error)
    }
}

const getRecetasByUserId = async (req, res) => {
    try {
        const id = req.params.id
        const recetas = await Usuario.getRecetasByUserId(id)
        res.send(recetas)
    } catch (error) {
        httpError(res, error)
    }
}

const getRecetasVisiblesByUserId = async (req, res) => {
    try {
        const id = req.params.id
        const recetas = await Usuario.getRecetasVisiblesByUserId(id)
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
        await Usuario.update({ usuario, mail }, { where: { id: id }}).then(result => {
            console.log(result)
        }).catch(error => {
            console.log(error)
        })
        res.send(req)
    } catch (error) {
        httpError(res, error)
    }   
}

const deleteUsuario = async (req, res) => {
    try {
        const id = req.params.id
    } catch (error) {
        httpError(res, error)
    }
}

export { getUsuario, getRecetasByUserId, getRecetasVisiblesByUserId, updateUsuario, deleteUsuario }