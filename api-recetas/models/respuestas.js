import { DataTypes } from "sequelize"
import { sequelize } from "../config/mysql.js"

const Respuesta = sequelize.define(
  "respuestas",
  {
    idComentario: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idUsuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idUsuarioMension: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    respuesta: {
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
    defaultScope: { attributes: { exclude: ["idUsuario", "idUsuarioMension"] } },
  }
)

export default Respuesta
