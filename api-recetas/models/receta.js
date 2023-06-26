import { DataTypes, Op } from 'sequelize'
import { sequelize } from '../config/mysql.js'

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
    idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, { timestamps: false })

//asocianciones

//metodos personalizados

export default Receta