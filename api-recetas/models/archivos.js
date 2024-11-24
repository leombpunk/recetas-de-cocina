import { DataTypes } from "sequelize"
import { sequelize } from "../config/mysql.js"

// ESTE MODELO TIENE LA FUNCIÓN DE ALAMACENAR LOS DATOS DE LOS ARCHIVOS
// QUE UN USUARIO SUBE AL BACKEND PARA TENER UN CONTROL SOBRE LOS ARCHIVOS
// ES DECIR SI ALGUN ARCHIVO NO SE BORRA POR EL MOTIVO QUE SEA, EXISTE EN LA
// BASE DE DATOS UN REGISTRO PARA SABER SI EL ARCHIVO FUE BORRADO O NO Y DONDE
// SE DEBERÍA ENCONTRAR
const Archivo = sequelize.define(
  "archivos",
  {
    idUsuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    directorio: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imagen: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    deleteAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    defaultScope: {
      attributes: { exclude: ["idUsuario"] },
    },
    scopes: {
      allData: {
        attributes: {}
      }
    },
    timestamps: false,
  }
)

export default Archivo
