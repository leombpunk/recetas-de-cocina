import * as yup from "yup"

const recipeSchema = yup.object({
  titulo: yup
    .string()
    .max(50, "El titulo no debe superar los 50 caracteres")
    .required("Ponle un titulo a tu receta"),
  imagen: yup
    .string()
    .max(100, "La imagen no es valida")
    .required("La imagen pra la receta es requerida"),
  urlPublica: yup
    .string()
    .max(200, "La url es demaisado larga")
    .url("La url no es valida")
    .required("La url para la imagen es requerida"),
  detalle: yup
    .string()
    .max(500, "EL detalle no debe superar los 500 caracteres")
    .required("El detalle de requerido"),
  duracion: yup
    .string()
    .max(20, "Este campo no debe superar los 20 caracteres")
    .required("El campo duración es requerido"),
  comensales: yup
    .string()
    .max(20, "Este campo no debe superar los 20 caracteres")
    .required("El campo comensales es requerido"),
  visibilidad: yup.number().notRequired(),
  ingredientes: yup.array().of(
    yup.object({
      name: yup
        .string()
        .max(50, "Este campo no debe superar los 50 caracteres")
        .required("El campo ingrediente es requerido"),
    })
  ),
  pasos: yup.array().of(
    yup.object({
      paso: yup
        .string()
        .max(500, "Este campo no debe superar los 500 caracteres")
        .required("El campo paso es requerido"),
      imagen: yup
        .string()
        .max(100, "Este campo no debe superar los 100 caracteres")
        .notRequired(),
      urlPublica: yup
        .string()
        .max(200, "La url es demaisado larga")
        .url("La url no es valida")
        .notRequired(),
    })
  ),
  checked: yup.number().notRequired(),
})

export default recipeSchema
