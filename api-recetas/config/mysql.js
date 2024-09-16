import * as dotenv from 'dotenv'
import { Sequelize } from 'sequelize'

dotenv.config()

const host = process.env.HOST
const username = process.env.DB_USER
const password = process.env.DB_PASS
const database = process.env.DB_NAME

const sequelize = new Sequelize(database, username, password, {
    host: host,
    dialect: 'mysql',
    timezone: '-03:00'
})

const dbConexion = async () => {
    try {
        await sequelize.authenticate()
        console.log('Conexion a la base de datos')
    } catch (error) {
        console.log(error)
        console.log('Error al conectar a la base de datos')
    }
}

export { sequelize, dbConexion }