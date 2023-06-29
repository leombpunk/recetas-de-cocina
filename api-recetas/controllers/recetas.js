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
    // const transaction = await sequelize.transaction()
    try {
        req = matchedData(req)
        // const idReceta = ""
        const { nombre, detalle, idUsuario, imagen, ingredientes } = req
        const result = await sequelize.transaction(async (t) => {
            const receta = await Receta.create({ nombre, detalle, idUsuario, imagen }, { transaction: t })
            const idReceta = receta.dataValues.id
            ingredientes.forEach(async element => {
                const { nombre, cantidad, detalle, imagen, idUnidadMedida } = element
                console.log(element)
                await Ingrediente.create({ nombre, cantidad, detalle, imagen, idUnidadMedida, idReceta }, { transaction: t })
            })
            return Receta.getFullRecetaById(idReceta)
        })
        // const receta = await Receta.create({ nombre, detalle, idUsuario, imagen }, { transaction: transaction })
        // console.log(receta.dataValues.id)
        // const idReceta = receta.dataValues.id
        // await Receta.create({ nombre, detalle, idUsuario, imagen }, { transaction: transaction }).then(result => {
        //     console.log(result)
        //     idReceta = result.dataValues.id
        //     console.log({ recetaID: idReceta })
        //     // res.status(201)
        //     // res.send(result)
        // }).catch(error => {
        //     console.log(error)
        //     res.status(500)
        //     res.send({ errors: error.errors })
        // })
        // ingredientes.forEach(async element => {
        //     const { nombre, cantidad, detalle, imagen, idUnidadMedida } = element
            // console.log(element)
            // await Ingrediente.create({ nombre, cantidad, detalle, imagen, idUnidadMedida, idReceta }, { transaction: transaction }).then(result =>{
        //         console.log(result)
        //     }).catch(error => {
        //         console.log(error)
        //         res.status(500)
        //         res.send({ errors: error.errors })
        //     })
        // })

        // console.log(req)
        res.status(201)
        res.send(result)
        // res.send({ ...req, idReceta: idReceta })
        // await transaction.commit()
    } catch (error) {
        // await transaction.rollback()
        httpError(res, error)
    }
}

const updateReceta = async (req, res) => {
    try {
        req = matchedData(req)
    } catch (error) {
        httpError(res, error)
    }
}

const deleteReceta = async (req, res) => {
    try {
        const id = req.params.id
    } catch (error) {
        httpError(res, error)
    }
}

export { getFullRecetaById, createReceta, updateReceta, deleteReceta }