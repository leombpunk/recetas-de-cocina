import passport from "passport"
import { Strategy } from "passport-google-oauth20"
import models from "../models/index.js"
import { tokenSign } from "../helpers/generateToken.js"
import { where } from "sequelize"

const today = new Date()

const passportConfig = passport

//estrategia para registrar e iniciar sesión
const strategy = new Strategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET_CLIENT,
    callbackURL: "http://localhost:3001/auth/google/callback",
  },
  async function (accessToken, refreshToken, profile, callback) {
    //hace las weas
    //lógica sobre que hacer con la info del usuario
    // console.log({ profile })
    try {
      const [user, created] = await models.Usuario.findOrCreate({
        where: { googleId: profile.id },
        defaults: {
          googleId: profile.id,
          nombres: profile.name.givenName,
          apellidos: profile.name.familyName,
          mail: profile.emails[0].value,
          createAt: today.toISOString(),
          usuario: profile.displayName,
        },
      })

      // console.log({ user })
      const token = await tokenSign(user)
      callback(null, { user, token })
    } catch (error) {
      callback(error, null)
    }
  }
)

//estrategia para vincular la cuenta de google a una cuenta ya creada
const  linkStrategy = new Strategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_SECRET_CLIENT,
  callbackURL: "http://localhost:3001/usuarios/perfil/google/callback",
},
async function (accessToken, refreshToken, profile, callback) {
  //hace las weas
  //lógica sobre que hacer con la info del usuario
  // console.log({ profile })
  try {
    // const [user, created] = await models.Usuario.findOrCreate({
    //   where: { googleId: profile.id },
    //   defaults: {
    //     googleId: profile.id,
    //     nombres: profile.name.givenName,
    //     apellidos: profile.name.familyName,
    //     mail: profile.emails[0].value,
    //     createAt: today.toISOString(),
    //     usuario: profile.displayName,
    //   },
    // })

    // console.log({ user })
    // const token = await tokenSign(user)
    callback(null, profile)
  } catch (error) {
    callback(error, null)
  }
})

passportConfig.use("google", strategy)
passportConfig.use("linkAccount", linkStrategy)

export default passportConfig
