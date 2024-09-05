import { verifyToken } from "../helpers/generateToken.js"
import Receta from "../models/receta.js"

const checkReceta = async (request, response, next) => {
  try {
    const token = request.headers.authorization.split(' ').pop()
    const tokenData = await verifyToken(token)
    const {idReceta} = request.params
    const receta = await Receta.findOne({ where: { idUsuario: tokenData.id, id: idReceta } })
    if (receta) {
      next()
    } else {
      response.status(401)
      response.send({
        error: "Error al subir la imagen, la referencia a la receta no existe",
      })
    }
  } catch (error) {
    console.log("/* checkReceta middleware (catch) */")
    console.log(error)
    response.status(401)
    response.send({
      message: "No posees permisos suficientes para realizar esta operacion",
      error: error,
    })
  }
}

export { checkReceta }
