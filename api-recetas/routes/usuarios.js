import { Router } from "express"
import {
  getUsuario,
  updateUsuario,
  deleteUsuario,
  updateUsuarioPass,
  unlinkGoogleAccount,
  linkGoogleAccount,
  linkGoogleAccountCallback,
} from "../controllers/usuarios.js"
import {
  checkAuth,
  checkUsername,
} from "../middlewares/auth.js"
import {
  validateUsuario,
  validatePass,
  validateDelete,
} from "../validators/usuarios.js"
import passportConfig from "../config/passport.js"

const router = Router()

/*************SOCILITA EL GOOGLE ID Y LO DEVUELVE AL FRONT***************/
//vincular/desvincular cuentas de google de una cuenta creada
router.get(
  "/perfil/google",
  passportConfig.authenticate("linkAccount", {
    scope: ["profile"],
    session: false,
  })
) //este redirecciona

router.get(
  "/perfil/google/callback",
  passportConfig.authenticate("linkAccount", {
    failureRedirect: "http://localhost:3000/profile",
    session: false,
  }),
  linkGoogleAccountCallback
) //este es el callback que recibe la info solicitada y lo envia al front
/*************SOCILITA EL GOOGLE ID Y LO DEVUELVE AL FRONT***************/

//muestra los datos del perfil
router.get("/perfil/:usuario", checkUsername, getUsuario) //actualizado, agregar checkauth ya que no se puede ver un perfil?

//actualizar la contraseña
router.put("/perfil/changePass/", checkAuth, validatePass, updateUsuarioPass)

//actualzia el perfil (logeado)
router.put("/perfil/:usuario", checkAuth, validateUsuario, updateUsuario)

//borra el perfil, que pasa con las recetas? (logeado)
router.delete("/perfil/:usuario", checkAuth, validateDelete, deleteUsuario)

// SETEA O PONE EN NULL EL CAMPO GOOGLE ID
router.patch("/perfil/google/linkAccount", checkAuth, linkGoogleAccount)
router.patch("/perfil/google/unlinkAccount", checkAuth, unlinkGoogleAccount) //desvincular cuenta de google

export { router }
