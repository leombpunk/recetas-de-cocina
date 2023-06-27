import { DataTypes, Op } from 'sequelize'
import { sequelize } from '../config/mysql.js'

const Ingrediente = sequelize.define('ingredientes',{
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cantidad: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    detalle: {
        type: DataTypes.STRING,
        allowNull: true
    },
    imagen: {
        type: DataTypes.STRING,
        allowNull: true
    },
    idReceta: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idUnidadMedida: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, { timestamps: false })

//asocianciones

//metodos personalizados

export default Ingrediente