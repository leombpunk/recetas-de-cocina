import { Router } from "express"
import {
  validateReceta,
  validateCreate,
  validateVisibility,
} from "../validators/recetas.js"
import {
  //   getFullRecetaById,
  //   getRecetasByUsername,
  getAllRecetas,
  getReceta,
  createReceta,
  updateReceta,
  deleteReceta,
  updateVisibilidad,
  getAllRecetasPublic,
  getRecetaPublic,
} from "../controllers/recetas.js"
import { checkAuth } from "../middlewares/auth.js"
import { checkReceta } from "../middlewares/receta.js"

const router = Router()

//endpoint recetas publicas
//getall
router.get("/public", getAllRecetasPublic) //filtros aplicados y paginado también

//este endpoint es ambiguo porque el endpoint de arriba ya filtra por nombre de usuario
// router.get('/public/usuario/:nombreUsuario', getRecetasByUsername) //nombreUsuario = usuario -> retorna la lista de recetas de un usuario especifico

//get
router.get("/public/:id", getRecetaPublic)
// router.get('/public/:id', getFullRecetaById) //retorna una receta segun su ID

//endpoint recetas con control de token
//getAll by username
//get by username
router.get("/", checkAuth, getAllRecetas) //trae las recetas del usuario logeado
router.get("/:id", checkAuth, getReceta) //trae la receta segun id del usuario loagado

router.post("/", checkAuth, validateCreate, createReceta)
router.patch("/compartir/", checkAuth, validateVisibility, updateVisibilidad) //falta terminar este endpoint
router.patch("/:id", checkAuth, checkReceta, validateReceta, updateReceta)
router.delete("/:id", checkAuth, checkReceta, deleteReceta)

export { router }
