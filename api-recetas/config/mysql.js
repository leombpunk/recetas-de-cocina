import * as dotenv from 'dotenv'
import { Sequelize } from 'sequelize'
import mysql2 from 'mysql2'

dotenv.config()

const host = process.env.HOST
const username = process.env.DB_USER
const password = process.env.DB_PASS
const database = process.env.DB_NAME
//for deploy
const dbport = process.env.DB_PORT

const sequelize = new Sequelize(database, username, password, {
    host: host,
    dialect: 'mysql',
    port: dbport, //for deploy
    timezone: '-03:00',
    dialectModule: mysql2,
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
