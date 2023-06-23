import { DataTypes, Op } from 'sequelize'
import { sequelize } from '../config/mysql.js'
//importar la conexion mysql

const Usuario = sequelize.define('usuarios',{
    usuario: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contrasena: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mail: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

export default Usuario