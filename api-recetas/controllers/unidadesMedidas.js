import { matchedData } from 'express-validator'
import UnidadMedida from '../models/unidadesMedidas.js'
import { httpError } from '../helpers/handleErrors.js'

const getAll = async (req, res) => {
    try {
        const unidadesMedidas = await UnidadMedida.findAll()
        res.send(unidadesMedidas)
    } catch (error) {
        httpError(res, error)
    }
}

const createUnidadMedida = async (req, res) => {
    try {
        // console.log(req)
        req = matchedData(req)
        // console.log(req)
        const { nombre } = req //req.body
        UnidadMedida.create({ nombre }).then(result => {
            res.status(201)
            res.send(result)
        }).catch(error => {
            console.log(error)
            res.status(500)
            res.send({ errors: error.errors })
        })
    } catch (error) {
        httpError(res, error)
    }
}

const deleteUnidadMedida = async (req, res) => {
    try {
        req = matchedData(req)
        const { id } = req
        UnidadMedida.destroy({
            where: { id }
        }).then(result => {
            res.send(result)
        }).catch(error => {
            res.status(500)
            res.send({ error: error.errors })
        })
    } catch (error) {
        httpError(res, error)
    }
}

export { getAll, createUnidadMedida, deleteUnidadMedida }