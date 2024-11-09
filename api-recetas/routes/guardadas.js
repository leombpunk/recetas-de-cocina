import { Router } from "express"
import { checkAuth } from "../middlewares/auth.js"
import { getAllSaves, createSave, deleteSave } from "../controllers/guardadas.js"

const router = Router()

router.get("/", checkAuth, getAllSaves)
router.post("/:id", checkAuth, createSave)
router.delete("/:id", checkAuth, deleteSave)

export { router }
