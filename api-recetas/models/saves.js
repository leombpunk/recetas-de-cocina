import { DataTypes } from "sequelize"
import { sequelize } from "../config/mysql.js"

const SaveRecipe = sequelize.define("guardadas",
  {
    idUsuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idReceta: {
      type: DataTypes.INTEGER,
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
  })

export default SaveRecipe
