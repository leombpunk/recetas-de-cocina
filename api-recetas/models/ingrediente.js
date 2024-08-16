import { DataTypes } from 'sequelize'
import { sequelize } from '../config/mysql.js'

//actualizado -> necesita ser testeado
const Ingrediente = sequelize.define('ingredientes',{
    idReceta: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    lista_ingredientes: {
        type: DataTypes.JSON,
        allowNull: false
    }, 
    lista_pasos: {
        type: DataTypes.JSON,
        allowNull: false
    },
}, { timestamps: false })

//asocianciones

//metodos personalizados

export default Ingrediente