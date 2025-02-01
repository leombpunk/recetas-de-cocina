import { DataTypes, Op } from "sequelize"
import { sequelize } from "../config/mysql.js"
import Usuario from "./usuario.js"
// import Ingrediente from "./ingrediente.js"

//actualizar
const Receta = sequelize.define(
  "recetas",
  {
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    detalle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imagen: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    urlPublica: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    visibilidad: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    almacenamiento: {
      type: DataTypes.ENUM("local", "cloud"),
      allowNull: false,
    },
    idUsuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    comensales: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duracion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ingredientes: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    pasos: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    checked: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    createAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updateAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    deleteAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: false,
    defaultScope: { attributes: { exclude: ["idUsuario"] } },
    scopes: {
      publicData: {
        attributes: { exclude: ["idUsuario", "visibilidad", "checked"] },
      },
      allData: { attributes: {} },
    },
  }
)

//metodos personalizados
Receta.getFullRecetaById = async (id) => {
  return await Receta.findOne({
    where: { id },
    include: [{ model: Usuario.scope("basicUserData"), required: true }],
  })
}

Receta.getFullRecetaByUsername = async (username) => {
  return await Receta.findAll({
    include: [
      {
        model: Usuario.scope("basicUserData"),
        required: true,
        where: { usuario: username },
      },
    ],
  })
}

export default Receta
