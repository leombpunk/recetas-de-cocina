import { DataTypes, Op } from 'sequelize'
import { sequelize } from '../config/mysql.js'
import Usuario from './usuario.js'
import Ingrediente from './ingrediente.js'

//actualizar
const Receta = sequelize.define('recetas',{
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    detalle: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imagen: {
        type: DataTypes.STRING,
        allowNull: true
    },
    visibilidad: {
        type: DataTypes.TINYINT,
        allowNull: false
    },
    idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    comensales: {
        type: DataTypes.STRING,
        allowNull: false
    },
    duracion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    checked: {
        type: DataTypes.TINYINT,
        allowNull: false
    }
}, { timestamps: false, })

//asocianciones
Receta.hasMany(Ingrediente, { foreignKey: 'idReceta' }) //una receta tiene muchos ingredientes
// Ingrediente.belongsTo(Receta, { foreignKey: 'id' }) //un ingrediente pertenece a una receta //no es necesario

// UnidadMedida.hasMany(Ingrediente, { foreignKey: 'id' }) //una unidad de medida tiene muchos ingredientes //no es necesario

//metodos personalizados
Receta.getFullRecetaById = async (id) => {
    return await Receta.findOne({
        where: { id }, 
        include: [{ model: Usuario, required: true },{ model: Ingrediente, required: true }],
    })
}

Receta.getFullRecetaByUsername = async (username) => {
    return await Receta.findAll({
        // where: { username }, 
        include: [{ model: Usuario.scope('withoutUserData'), required: true, where: { usuario: username } }],
    })
}

export default Receta