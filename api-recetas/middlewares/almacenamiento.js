import multer from 'multer'
import { extname, join, dirname } from 'path'
import { fileURLToPath } from 'url'

const MIMETYPES = ['image/jpeg','image/png','image/webp']
const CURRENT_DIR = dirname(fileURLToPath(import.meta.url))

const almacenamiento = multer.diskStorage({
    destination: join(CURRENT_DIR, '../public/images/recipes'), //direccion absoluta del directorio actual
    filename: (req, file, callback) => {
        const extension = extname(file.originalname) //extrae la extension del archivo
        const filename = `file-${Date.now()}${extension}` //nombre del archivo
        callback(null, filename)
    }
})

const upload = multer({ 
    storage: almacenamiento, 
    fileFilter: (req, file, callback) => {
        console.log(file)
        if (!file) callback(null, false)
        if (MIMETYPES.includes(file.mimetype)) callback(null, true)
        else callback(new Error(`Solo se aceptan los siguientes formatos de imagen: ${MIMETYPES.join()}`))
    }, 
    limits: { 
        fileSize: 1000000,
    }
})

export { upload }