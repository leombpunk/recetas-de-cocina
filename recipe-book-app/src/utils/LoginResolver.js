import * as yup from "yup"

const loginSchema = yup.object({
  username: yup
    .string()
    .max(16, "Máximo 16 caracteres")
    .required("Este campo es requerido"),
  password: yup
    .string()
    .max(16, "Máximo 16 caracteres")
    .required("Este campo es requerido"),
})

export default loginSchema
