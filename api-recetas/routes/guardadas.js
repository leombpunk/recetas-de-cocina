import { Router } from "express"
import { checkAuth } from "../middlewares/auth.js"
import { createSave, deleteSave } from "../controllers/guardadas.js"

const router = Router()

router.post("/:id", checkAuth, createSave)
router.delete("/:id", checkAuth, deleteSave)

export { router }
