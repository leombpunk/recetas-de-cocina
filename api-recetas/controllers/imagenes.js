import { httpError } from '../helpers/handleErrors.js'
import Usuario from '../models/usuario.js'
import Receta from '../models/receta.js'
import fs from 'fs'

// Usuarios
const uploadProfileImg = async (req, res) => {
    try {
        const idUsuario = req.params.id
        const avatar = req.file
        console.log(avatar)
        await Usuario.update({ imagen: avatar.filename },{ where: { id: idUsuario }}).then(result =>{
            console.log(result)
            if (result[0]) {
                res.status(200).send({ message: 'Imagen guardada', result: result })
            }
            else {
                //borrar el archivo
                fs.unlink(file.path, (error)=>{
                    if(error) throw error
                    else console.log('cb: mensaje del metodo fs.unlink')
                })
                res.status(404).send({ message: 'La Imagen no fue guardada, la receta no existe.', result: result }) //Not found
            }
        }).catch(error => {
            console.log(error)
            res.status(500).send({errors: error.errors})
        })
    } catch (error) {
        httpError(res, error)
    }
}

// Recetas
const uploadRecetaImg = async (req, res) => {
    try {
        const idReceta = req.params.id
        const file = req.file
        console.log(file)
        await Receta.update({ imagen: file.filename },{ where: { id: idReceta }}).then(result =>{
            console.log(result)
            if (result[0]) {
                res.status(200).send({ message: 'Imagen guardada', result: result })
            }
            else {
                //borrar el archivo
                fs.unlink(file.path, (error)=>{
                    if(error) throw error
                    else console.log('cb: mensaje del metodo fs.unlink')
                })
                res.status(404).send({ message: 'La Imagen no fue guardada, la receta no existe.', result: result }) //Not found
            }
        }).catch(error => {
            console.log(error)
            res.status(500).send({errors: error.errors})
        })
    } catch (error) {
        httpError(res, error)
    }
}

export { uploadProfileImg, uploadRecetaImg }
