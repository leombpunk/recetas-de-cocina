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
        },
        withoutUserData: { attributes : { exclude: ['id', 'usuario', 'contrasena', 'mail', 'imagen'] }, },
    },
    timestamps: false 
})

Usuario.hasMany(Receta, { foreignKey: 'idUsuario' }) //un usuario tiene muchas recetas
Receta.belongsTo(Usuario, { foreignKey: 'idUsuario' }) //una receta pertenece a un usuario

//metodos personalizados
//retorna un usuario y todas sus recetas -> para usar en el perfil logeado
Usuario.getRecetasByUserId = async (id) => {
    return await Usuario.findOne({ where: { id }, include: Receta })
}

//retorna un usuario y las recetas visibles solamente -> para ver las recetas de un usuario cualquiera distinto del logeado
Usuario.getRecetasVisiblesByUserId = async (id) => {
    return await Usuario.findOne({ where: { id }, include: { model: Receta, where: { visibilidad: 1 }, required: false }})
}

Usuario.getUsuarioByUsername = async (username) => {
    return await Usuario.findOne({ where: { usuario: username }})
}

Usuario.getUsuarioByUserwPass = async (username) => {
    return await Usuario.scope('withPassword').findOne({ where: { usuario: username }})
}

export default Usuario