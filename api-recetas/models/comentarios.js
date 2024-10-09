import { DataTypes } from "sequelize"
import { sequelize } from "../config/mysql.js"

const Comentario = sequelize.define(
  "comentarios",
  {
    idUsuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idReceta: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    comentario: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    defaultScope: {
      attributes: { exclude: ["idUsuario"] },
    },
  }
)

export default Comentario
