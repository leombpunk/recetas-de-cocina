import * as yup from "yup"

const recipeSchema = yup.object({
  titulo: yup.string().required("Ponle un titulo a tu receta"),
  detalle: yup.string(),
  duracion: yup.string(),
  comensales: yup.string(),
  visibilidad: yup.number(),
  ingredientes: yup.array().of(yup.object({
    name: yup.string().required()
  })),
  pasos: yup.array().of(yup.object({
    paso: yup.string().required(),
    imagen: yup.string().url().notRequired()
  })),
  imagen: yup.string()
})

export default recipeSchema
