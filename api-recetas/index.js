import express from "express"
import * as dotenv from "dotenv"
import cors from "cors"
import router from "./routes/index.js"
import { dbConexion } from "./config/mysql.js"
import passportConfig from "./config/passport.js"

//config para los cors
var whitelist = ["http://localhost:3000"]
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
}

dotenv.config()
const app = express()
const port = process.env.PORT
app.use(cors(/*corsOptions*/))
app.use(express.json())
app.use(passportConfig.initialize())
//servidor de datos estaticos
// app.use("/static", express.static("public/images/recipes"))
// app.use("/avatar", express.static("public/images/avatars"))
app.use("/public", express.static("public/images"))
app.use(router)
app.listen(port, () => {
  console.log("API funcionando en el puerto", port)
})
dbConexion()
