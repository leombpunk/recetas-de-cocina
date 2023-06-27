import { DataTypes, Op } from 'sequelize'
import { sequelize } from '../config/mysql.js'
import Receta from './receta.js'

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
    },
    imagen: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, { timestamps: false })

//asocianciones
// Usuario.hasMany(Receta, { foreignKey: 'idUsuario' }) //un usuario tiene muchas recetas
//metodos personalizados

export default Usuario