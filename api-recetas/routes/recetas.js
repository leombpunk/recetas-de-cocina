import { Router } from "express"
import {
  validateReceta,
  validateCreate,
  validateVisibility,
  validatePatch,
} from "../validators/recetas.js"
import {
  getAllRecetas,
  getReceta,
  createReceta,
  updateReceta,
  deleteReceta,
  updateVisibilidad,
  getAllRecetasPublic,
  getRecetaPublic,
  patchReceta,
} from "../controllers/recetas.js"
import { checkAuth } from "../middlewares/auth.js"
import { checkReceta } from "../middlewares/receta.js"

const router = Router()

//endpoint recetas publicas
router.get("/public", getAllRecetasPublic) //filtros aplicados y paginado también //agregar que también filtre por ingredientes 
router.get("/public/:id", getRecetaPublic)

//endpoint recetas con control de token
router.get("/", checkAuth, getAllRecetas) //trae las recetas del usuario logeado
router.get("/:id", checkAuth, getReceta) //trae la receta segun id del usuario loagado

router.post("/", checkAuth, validateCreate, createReceta)
router.patch("/compartir/", checkAuth, validateVisibility, updateVisibilidad) //falta terminar este endpoint
router.patch("/:id", checkAuth, checkReceta, validatePatch, patchReceta) //hacer que solo actualice la imagen de portada e imagen de pasos y si agrega o quita pasos
router.put("/:id", checkAuth, checkReceta, validateReceta, updateReceta)
router.delete("/:id", checkAuth, checkReceta, deleteReceta)

export { router }
