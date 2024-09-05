import { httpError } from "../helpers/handleErrors.js"
import Usuario from "../models/usuario.js"
import Receta from "../models/receta.js"
import fs from "fs"
import { dirname, join } from "path"
import { fileURLToPath } from "url"
import express from "express"

const publicPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "../public/images/recipes"
)

const publicFolder = express.static(
  join(dirname(fileURLToPath(import.meta.url)), "../public/images/recipes")
)

// Usuarios
const uploadProfileImg = async (req, res) => {
  try {
    const idUsuario = req.params.id
    const avatar = req.file
    console.log(avatar)
    await Usuario.update(
      { imagen: avatar.filename },
      { where: { id: idUsuario } }
    )
      .then((result) => {
        console.log(result)
        if (result[0]) {
          res.status(200).send({ message: "Imagen guardada", result: result })
        } else {
          fs.unlink(file.path, (error) => {
            if (error) throw error
            else console.log("cb: mensaje del metodo fs.unlink")
          })
          res.status(404).send({
            message: "La Imagen no fue guardada, la receta no existe.",
            result: result,
          }) //Not found
        }
      })
      .catch((error) => {
        console.log(error)
        res.status(500).send({ errors: error.errors })
      })
  } catch (error) {
    httpError(res, error)
  }
}

const deleteProfileImg = async (req, res) => {
  try {
    const idUsuario = req.params.id
    const usuario = await Usuario.findOne({ where: { id: idUsuario } })
    if (usuario) {
      const { imagen } = usuario
      if (imagen) {
        console.log("equisde")
        fs.unlink(`${publicPath}/${imagen}`, (error) => {
          if (error) throw error
          else console.log("cb: mensaje del metodo fs.unlink")
        })
        res.status(200).send({ message: "Imagen eliminada" })
      } else {
        console.log("no equisde")
        res.status(404).send({ message: "Imagen no encontrada" })
      }
    } else {
      res.status(404).send({ message: "El usuario no existe" })
    }
  } catch (error) {
    httpError(res, error)
  }
}

// Recetas
//solo para la portada de la receta
const uploadRecetaImg = async (req, res) => {
  try {
    const file = req.file
    // console.log(file)
    // console.log(req.headers.authorization) //andó
    res.status(200).send({ message: "Imagen guardada", result: file })
    // const idReceta = req.params.id
    // const file = req.file
    // console.log(file)
    // await Receta.update({ imagen: file.filename }, { where: { id: idReceta } })
    //   .then((result) => {
    //     console.log(result)
    //     if (result[0]) {
    //       res.status(200).send({ message: "Imagen guardada", result: result })
    //     } else {
    //       fs.unlink(file.path, (error) => {
    //         if (error) throw error
    //         else console.log("cb: mensaje del metodo fs.unlink")
    //       })
    //       res
    //         .status(404)
    //         .send({
    //           message: "La Imagen no fue guardada, la receta no existe.",
    //           result: result,
    //         }) //Not found
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error)
    //     res.status(500).send({ errors: error.errors })
    //   })
  } catch (error) {
    httpError(res, error)
  }
}

//solo para la portada de la receta
const deleteRecetaImg = async (req, res) => {
  try {
    const { filename } = req.params
    fs.unlink(`${publicPath}/${filename}`, (error) => {
      if (error) throw error
      else console.log("cb: mensaje del metodo fs.unlink")
    })
    res.status(200).send({ message: "Imagen eliminada" })
  } catch (error) {
    httpError(res, error)
  }
}
// const deleteRecetaImg = async (req, res) => {
//   try {
//     const idReceta = req.params.id
//     const receta = await Receta.findOne({ where: { id: idReceta } })
//     if (receta) {
//       const { imagen } = receta
//       if (imagen) {
//         console.log("equisde")
//         fs.unlink(`${publicPath}/${imagen}`, (error) => {
//           if (error) throw error
//           else console.log("cb: mensaje del metodo fs.unlink")
//         })
//         res.status(200).send({ message: "Imagen eliminada" })
//       } else {
//         console.log("no equisde")
//         res.status(404).send({ message: "Imagen no encontrada" })
//       }
//     } else {
//       res.status(404).send({ message: "La receta no existe" })
//     }
//   } catch (error) {
//     httpError(res, error)
//   }
// }

export {
  publicFolder,
  uploadProfileImg,
  uploadRecetaImg,
  deleteProfileImg,
  deleteRecetaImg,
}
