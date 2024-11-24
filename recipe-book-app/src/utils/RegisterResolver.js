import * as yup from "yup"

const RegisterSchema = yup.object({
  username: yup
    .string()
    .max(16, "Máximo 16 caracteres")
    .min(6, "Mínimo 6 caracteres")
    .required("El nombre de usuario es requerido"),
  password: yup
    .string()
    .max(16, "Máximo 16 caracteres")
    .min(8, "Mínimo 8 caracteres")
    .required("La contraseña es requerida"),
  mail: yup
    .string()
    .email("Debe ser un correo electrónico válido")
    .max(16, "Máximo 16 caracteres")
    .min(8, "Mínimo 8 caracteres")
    .required("El correo electrónico es requerido"),
})

export default RegisterSchema
