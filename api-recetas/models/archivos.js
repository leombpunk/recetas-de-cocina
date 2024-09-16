import { DataTypes } from "sequelize"
import { sequelize } from "../config/mysql.js"

const Archivo = sequelize.define(
  "archivos",
  {
    idUsuario: {
      type: DataTypes.INTEGER,
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
