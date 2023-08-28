import { DataTypes, Op } from 'sequelize'
import { sequelize } from '../config/mysql.js'
import Usuario from './usuario.js'
import Ingrediente from './ingrediente.js'
import UnidadMedida from './unidadesMedidas.js'

const Receta = sequelize.define('recetas',{
    nombre: {
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
    }
}, { timestamps: false })

//asocianciones
//no entiendo como hace las asociaciones
//o el problema vendra porque es include esta mal planteado
// Usuario.hasMany(Receta, { foreignKey: 'idUsuario' }) //un usuario tiene muchas recetas
// Receta.belongsTo(Usuario, { foreignKey: 'idUsuario' }) //una receta pertenece a un usuario

Receta.hasMany(Ingrediente, { foreignKey: 'idReceta' }) //una receta tiene muchos ingredientes
// Ingrediente.belongsTo(Receta, { foreignKey: 'id' }) //un ingrediente pertenece a una receta //no es necesario

Ingrediente.belongsTo(UnidadMedida, { foreignKey: 'idUnidadMedida' }) //un ingrediente pertenece a una unidad de medida
// UnidadMedida.hasMany(Ingrediente, { foreignKey: 'id' }) //una unidad de medida tiene muchos ingredientes //no es necesario

//metodos personalizados
Receta.getFullRecetaById = async (id) => {
    return await Receta.findOne({
        where: { id }, 
        include: [{ model: Usuario, required: true },{ model: Ingrediente, include: { model: UnidadMedida, required: true }, required: true }],
    })
}

export default Receta