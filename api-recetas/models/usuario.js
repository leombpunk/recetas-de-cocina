import { DataTypes, Op } from 'sequelize'
import { sequelize } from '../config/mysql.js'
import Receta from './receta.js'

const Usuario = sequelize.define('usuarios', {
    usuario: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    contrasena: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mail: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    imagen: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, { 
    defaultScope: {
        attributes: { exclude: ['contrasena'] }
    },
    scopes: {
        withPassword: {
            attributes: {},
        }
    },
    timestamps: false 
})

Usuario.hasMany(Receta, { foreignKey: 'id' }) //un usuario tiene muchas recetas //no se puede poner en el modelo correspondiente
Receta.belongsTo(Usuario, { foreignKey: 'idUsuario' }) //una receta pertenece a un usuario

//metodos personalizados
Usuario.getRecetasByUserId = async (id) => {
    return await Usuario.findOne({ where: { id }, include: Receta })
}

Usuario.getUsuarioByUsername = async (username) => {
    return await Usuario.findOne({ where: { usuario: username }})
}

Usuario.getUsuarioByUserwPass = async (username) => {
    return await Usuario.scope('withPassword').findOne({ where: { usuario: username }})
}

export default Usuario