import multer from 'multer'
import { extname } from 'path'

const MIMETYPES = ['imagen/jpeg','image/png','image/webp']

const almacenamiento = multer.diskStorage({
    destination: (request, file, callback) => {
        const { pathname } = new URL('..', import.meta.url) //direccion absoluta del directorio actual
        const pathStorage = `${pathname}storage` //lugar donde se almacenaran las imagenes
        callback(null, pathStorage)
    },
    filename: (request, file, callback) => {
        const extension = extname(file) //extrae la extension del archivo
        const filename = `file-${Date.now()}.${extension}` //nombre del archivo
        callback(null, filename)
    }
})

const upload = multer({ 
    storage: almacenamiento, 
    fileFilter: (req, file, callback) => {
        if (MIMETYPES.includes(file.mimetype)) callback(null, true)
        else callback(new Error(`Solo se aceptan los siguientes formatos de imagen: ${MIMETYPES.join()}`))
    }, 
    limits: { 
        fileSize: 1000000 
    }
})

export { upload }