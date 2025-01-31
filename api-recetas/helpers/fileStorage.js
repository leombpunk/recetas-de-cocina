import * as dotenv from "dotenv"
import { rmdir, mkdir, writeFile, unlink } from "node:fs"
import { dirname, extname, join } from "node:path"
import { fileURLToPath } from "node:url"
import Imagekit from "../config/imagekit.js"

dotenv.config()

const storage = process.env.STORAGE === "1" ? "cloud" : "local"
const publicPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "../public/images/users"
)
const urlPublicPath = "http://localhost:3000/public/users"

//manejo de carpetas de almacenamiento de imagenes
//tanto para local como en la nube

//ver si vale la pena crear codigo para guardar/borrar archivos
//con fs de node

//necesito crear una carpeta para cada usuario cuando se registre
//y borrarla cuando se elimine

const createUserFolder = async (user) => {
  try {
    //crear la carpeta (local o cloud) para almacenar las imágenes
    if (storage === "cloud") {
      Imagekit.createFolder(
        {
          folderName: "folder".concat(user.id), //nombre de al carpeta
          parentFolderPath: "/recipe-app/", //ruta de la carperta --> si la ruta no existe, crea las subcarpetas necesarias
        },
        (error, result) => {
          if (error) {
            console.log(error)
            throw error
          } else {
            console.log(result)
          }
        }
      )
    } else {
      //probar esta version
      mkdir(publicPath.concat("/folder", user.id), (error) => {
        if (error) {throw error} else {console.log("carpeta creada")}})
    }
  } catch (error) {
    console.log(error)
    throw error
  }
}

const deleteUserFolder = async (user) => {
  try {
    //elimina la carpeta de datos del usuario
    if (storage === "cloud") {
      Imagekit.deleteFolder(`/recipe-app/folder${user.id}`, (error, result) => {
        if (error) {
          console.log(error)
          throw error
        } else {
          console.log(result)
        }
      })
    } else {
      rmdir(`${publicPath}/folder${user.id}`, (error) => {
        if (error) {
          console.log(error)
        } else {
          console.log("carpeta borrada")
        }
      })
    }
  } catch (error) {
    console.log(error)
    throw error
  }
}

//manejo de archivos solamente en la nube
const uploadFile = async (user, file, uniqueName = true) => {
  try {
    const extension = extname(file.originalname) //extrae la extension del archivo
    // file.originalname = `file-${Date.now()}${extension}`
    if (storage === 'cloud'){
      const result = new Promise((resolve, reject) => {
        Imagekit.upload(
          {
            file: file.buffer, //base64Img, //required
            fileName: file.originalname.split(".")[0], //required
            folder: `/recipe-app/${user.carpeta}`, //required,
            useUniqueFileName: uniqueName, //optional
            overwriteFile: true,
          },
          (error, result) => {
            if (error) {
              console.log({error})
              reject(error)
            } else {
              console.log({result})
              resolve(result)
            }
          }
        )
      })
      return result
    } else {
      const filename = file.originalname
      const path = `${publicPath}/${user.carpeta}/${filename}`
      const urlPath = `${urlPublicPath}/${user.carpeta}/${filename}`
      const result = new Promise((resolve, reject) => {
        writeFile(path, file.buffer, (error) => {
          if (error) reject({ error, status: false });
          else resolve({ fileId: filename, file, url: urlPath, status: true });
        });
      });
      return result
    }
    // return uploadResult
  } catch (error) {
    console.log({error})
    throw error
  }
}

const deleteFile = async (user, fileId) => {
  try {
    if (storage === 'cloud') {
      const result = new Promise((resolve, reject) => {
        Imagekit.deleteFile(fileId, (error, result) => {
          if (error) {
            console.log({error})
            reject({error, status: false})
          } else {
            console.log({result})
            resolve({result, status: true})
          }
        })
      })
      return result
    } else {
      const result = new Promise((resolve, reject) => { 
        unlink(
          `${publicPath}/${user.carpeta}/${fileId}`,
          (error) => {
            if (error) {
              reject({error, status: false})
            } 
            else {
              console.log("eliminar archivo")
              resolve({message: 'archivo eliminado', status: true})
            }
          }
        )
      })
      return result
    }
  } catch (error) {
    console.log({error})
    throw error
  }
}

export {
  createUserFolder,
  deleteUserFolder,
  uploadFile,
  deleteFile,
}
