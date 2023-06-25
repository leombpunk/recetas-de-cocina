import { DataTypes, Op } from 'sequelize'
import { sequelize } from '../config/mysql.js'

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

//asocianciones

//metodos personalizados

export default Usuario