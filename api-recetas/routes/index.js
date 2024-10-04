import express from "express"
import { router as authRouter } from "./auth.js"
import { router as recetasRouter } from "./recetas.js"
import { router as usuariosRouter } from "./usuarios.js"
import { router as imagenesRouter } from "./imagenes.js"
import { router as likesRouter } from "./likes.js"

const router = express.Router()

router.use("/auth", authRouter)
router.use("/recetas", recetasRouter)
router.use("/usuarios", usuariosRouter)
router.use("/imagenes", imagenesRouter)
router.use("/likes", likesRouter)

router.get("*", (request, response) => {
  response.status(404)
  response.send({ error: "Ruta no encontrada" })
})

export default router
