import multer from "multer"

const MIMETYPES = ["image/jpeg", "image/png", "image/webp"]

//agregar otro almacenamiento para guardar las weas del perfil en carpeta avatars
const almacenamiento = multer.memoryStorage()

//agregar otro upload que ocupe el otro almacenamiento y con otro limite de tamaño para los avatares de perfil
const upload = multer({
  storage: almacenamiento,
  fileFilter: (req, file, callback) => {
    console.log(file)
    if (!file) callback(null, false)
    if (MIMETYPES.includes(file.mimetype)) callback(null, true)
    else
      callback(
        new Error(
          `Solo se aceptan los siguientes formatos de imagen: ${MIMETYPES.join()}`
        )
      )
  },
  limits: {
    fileSize: 50000000, //50mb aprox
  },
})

export { upload }
