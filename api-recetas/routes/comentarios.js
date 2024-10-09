import { Router } from "express"
import { checkAuth } from "../middlewares/auth.js"
import {
  getComentarios,
  getRespuestas,
  createComentario,
  deleteComentario,
  createRespuesta,
  deleteRespuesta,
} from "../controllers/comentarios.js"
import { validateCreateComentario, validateCreateRespuesta } from "../validators/comentarios.js"

const router = Router()

router.get("/:id", getComentarios) //todos los comentarios de una receta (id -> id de la receta)
router.get("/respuesta/:id", checkAuth, getRespuestas) //las respuestas relacionadas a un comentario (id -> id del comentario)
router.post("/:id", validateCreateComentario, checkAuth, createComentario) //crea un comentario para una receta (id -> id de la receta)
router.delete("/:id", checkAuth, deleteComentario) //elimina el comentario/respuesta (lo hace en cadena maybe) (id -> del comentario)
router.post("/respuesta/:id", validateCreateRespuesta, checkAuth, createRespuesta) //(id -> del comentario)
router.delete("/respuesta/:id", checkAuth, deleteRespuesta) //(id -> de la respuesta)

export { router }
