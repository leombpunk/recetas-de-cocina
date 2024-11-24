import { Router } from "express"
import { checkAuth } from "../middlewares/auth.js"
import {
  getLikes,
  getLikesDetails,
  createLike,
  deteleLike,
} from "../controllers/likes.js"

const router = Router()

router.get("/:id", getLikes) //todos los likes de una receta (cantidad)

router.get("/details/:id", checkAuth, getLikesDetails) //lista de usuarios que dieron like a una receta
router.post("/:id", checkAuth, createLike) //agregar like a receta
router.delete("/:id", checkAuth, deteleLike) //borrar like a receta

export { router }
