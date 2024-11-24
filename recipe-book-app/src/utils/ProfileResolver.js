import * as yup from "yup"

const profileSchema = yup.object({
  nombres: yup
    .string()
    .max(100, "Máximo 100 caracteres")
    .required("Debes ingresar por lo menos un nombre"),
  apellidos: yup
    .string()
    .max(100, "Máximo 100 caracteres")
    .required("Debes ingresar por lo menos un nombre"),
  mail: yup
    .string()
    .email(50, "Máximo 50 caracteres")
    .required("Debes ingresar tu correo electrónico"),
})

const passwordSchema = yup.object({
  oldPassword: yup
    .string()
    .min(8, "Mínimo 8 caracteres")
    .max(16, "Máximo 16 caracteres")
    .required("Este campo es obligatorio"),
  newPassword: yup
    .string()
    .min(8, "Mínimo 8 caracteres")
    .max(16, "Máximo 16 caracteres")
    .required("Este campo es obligatorio"),
})

export { profileSchema, passwordSchema }
