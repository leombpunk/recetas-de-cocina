import Receta from '../models/receta.js'
import Ingrediente from '../models/ingrediente.js'
import { matchedData } from 'express-validator'
import { httpError } from '../helpers/handleErrors.js'
import { sequelize } from '../config/mysql.js'

const getFullRecetaById = async (req, res) => {
    try {
        const id = req.params.id
        // const receta = await Receta.getFullRecetaById(id)
        // res.send(receta)
        await Receta.getFullRecetaById(id).then(result => {
            res.send(result)
        }).catch(error => {
            res.status(500)
            res.send({ errors: error.erros })
        })
    } catch (error) {
        httpError(res, error)
    }
}

const createReceta = async (req, res) => {
    try {
        req = matchedData(req)
        const { nombre, detalle, idUsuario, ingredientes } = req //omito el campo imagen
        const result = await sequelize.transaction(async (t) => {
            const receta = await Receta.create({ nombre, detalle, idUsuario }, { transaction: t })
            const idReceta = receta.dataValues.id
            ingredientes.forEach(async element => {
                const { nombre, cantidad, detalle, idUnidadMedida } = element //omito el campo imagen
                // console.log(element)
                await Ingrediente.create({ nombre, cantidad, detalle, idUnidadMedida, idReceta }, { transaction: t })
            })
            return Receta.getFullRecetaById(idReceta)
        })
        res.status(201)
        res.send(result)
    } catch (error) {
        httpError(res, error)
    }
}

const updateReceta = async (req, res) => {
    try {
        const idReceta = req.params.id
        req = matchedData(req)
        const { nombre, detalle, idUsuario, ingredientes } = req //omito el campo imagen
        const result = await sequelize.transaction(async (t) => {
            await Receta.update({ nombre, detalle, idUsuario }, { transaction: t, where: { id: idReceta } })
            await Ingrediente.destroy({ transaction: t, where: { idReceta: idReceta }, force: true }) //sin la prop 'force' hace un soft-delete por defecto
            ingredientes.forEach(async element => {
                const { nombre, cantidad, detalle, idUnidadMedida } = element //omito el campo imagen
                // console.log(element)
                await Ingrediente.create({ nombre, cantidad, detalle, idUnidadMedida, idReceta }, { transaction: t, where: { idReceta: idReceta }})
            })
            return Receta.getFullRecetaById(idReceta)
        })
        res.status(200)
        res.send(result)
    } catch (error) {
        httpError(res, error)
    }
}

const deleteReceta = async (req, res) => {
    try {
        const idReceta = req.params.id
        const result = await sequelize.transaction(async (t) => {
            await Ingrediente.destroy({ transaction: t, where: { idReceta: idReceta }, force: true })
            await Receta.destroy({ transaction: t, where: { id : idReceta }, force: true})
        })
        res.status(200)
        res.send(result) //a ver que hará
    } catch (error) {
        httpError(res, error)
    }
}

export { getFullRecetaById, createReceta, updateReceta, deleteReceta }