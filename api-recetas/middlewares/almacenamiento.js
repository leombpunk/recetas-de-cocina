import multer from 'multer'
import { extname, join, dirname } from 'path'
import { fileURLToPath } from 'url'

const MIMETYPES = ['image/jpeg','image/png','image/webp']
const CURRENT_DIR = dirname(fileURLToPath(import.meta.url))

//agregar otro almacenamiento para guardar las weas del perfil en carpeta avatars
const almacenamiento = multer.diskStorage({
    destination: join(CURRENT_DIR, '../public/images/recipes'), //direccion absoluta del directorio actual
    filename: (req, file, callback) => {
        const extension = extname(file.originalname) //extrae la extension del archivo
        const filename = `file-${Date.now()}${extension}` //nombre del archivo
        callback(null, filename)
    }
})

const almacenamientoAvatar = multer.diskStorage({
    destination: join(CURRENT_DIR, '../public/images/avatars'), //direccion absoluta del directorio actual
    filename: (req, file, callback) => {
        const {username} = req.params
        const extension = extname(file.originalname) //extrae la extension del archivo
        const filename = `${username}-${Date.now()}${extension}` //nombre del archivo
        callback(null, filename)
    }
})

//agregar otro upload que ocupe el otro almacenamiento y con otro limite de tamaño para los avatares de perfil
const upload = multer({ 
    storage: almacenamiento, 
    fileFilter: (req, file, callback) => {
        console.log(file)
        if (!file) callback(null, false)
        if (MIMETYPES.includes(file.mimetype)) callback(null, true)
        else callback(new Error(`Solo se aceptan los siguientes formatos de imagen: ${MIMETYPES.join()}`))
    }, 
    limits: { 
        fileSize: 50000000, //50mb aprox
    }
})

const uploadAvatar = multer({ 
    storage: almacenamientoAvatar, 
    fileFilter: (req, file, callback) => {
        console.log(file)
        if (!file) callback(null, false)
        if (MIMETYPES.includes(file.mimetype)) callback(null, true)
        else callback(new Error(`Solo se aceptan los siguientes formatos de imagen: ${MIMETYPES.join()}`))
    }, 
    limits: { 
        fileSize: 50000000, //50mb aprox
    }
})
export { upload, uploadAvatar }