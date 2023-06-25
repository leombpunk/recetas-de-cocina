import { DataTypes, Op } from 'sequelize'
import { sequelize } from '../config/mysql.js'

const UnidadMedida = sequelize.define('unidades_medidas',
{
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { timestamps: false })

//asocianciones
//no tiene

//metodos personalizados
//no tiene, quizas sí

export default UnidadMedida