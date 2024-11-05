import { Router } from "express"
import { checkAdmin } from "../middlewares/auth.js"
import { limpiarArchivos } from "../controllers/admin.js"

const router = Router()

router.get("/", checkAdmin, limpiarArchivos)

export { router }
