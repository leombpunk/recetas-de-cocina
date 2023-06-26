import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import router from './routes/index.js'
import { dbConexion } from './config/mysql.js'

dotenv.config()
const app = express()
const port = process.env.PORT
app.use(cors())
app.use(express.json())
app.use(router)
app.listen(port, () => {
    console.log('API funcionando en el puerto', port)
})
dbConexion()