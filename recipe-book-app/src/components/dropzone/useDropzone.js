import { useRef, useState } from "react"

const useDropzone = ({ isMultiple }) => {
  const validData = ["image/png", "image/jpeg", "image/webp"]
  const [inputFile, setInputFile] = useState(null)
  const [errors, setErrors] = useState(null)
  const fileRef = useRef(null)

  //abre la ventana de seleccion del archivos del sistema al hacer un click
  const handleClickDropzone = () => {
    fileRef.current.click()
  }
  //setea el archivo seleccionado por el usuario
  const handleChangeInputFiles = (event) => {
    setErrors(null)
    if (isMultiple) {
      event.target.files.forEach((item, i) => {
        console.log(item)
        validFile(item)
          ? setInputFile(item)
          : setErrors([
              ...errors,
              [
                {
                  message: "El archivo no es valido!",
                  type: item.type,
                  filename: item.name,
                },
              ],
            ])
      })
    } else {
      console.log(event.target.files[0])
      validFile(event.target.files[0])
        ? setInputFile(event.target.files[0])
        : setErrors([
            {
              message: "El archivo no es valido!",
              type: event.target.files[0].type,
              filename: event.target.files[0].name,
            },
          ])
    }
    // validFile(event.target.files[0])
    // isMultiple
    //   ? setInputFile([...inputFile, event.target.files[0]])
    //   : setInputFile(event.target.files[0])
  }
  //captura  el archivo cuando se suelta sobre el elemento html
  const handleDropInDropzone = (event) => {
    event.preventDefault()
    if (isMultiple) {
      if (event.dataTransfer.items) {
        // Use DataTransferItemList interface to access the file(s)
        // console.log(event.dataTransfer.items[0]) //kind:"file", type:"image/png"
        ;[...event.dataTransfer.items].forEach((item, i) => {
          if (validFile(item)) {
            // If dropped items aren't files, reject them
            if (item.kind === "file") {
              const file = item.getAsFile()
              // Create a data transfer object. Similar to what you get from a `drop` event as `event.dataTransfer`
              const dataTransfer = new DataTransfer()
              // Add your file to the file list of the object
              dataTransfer.items.add(file)
              // Set your input `files` to the file list
              fileRef.files = dataTransfer.files
              setInputFile([...inputFile, dataTransfer.files])
            }
          } else {
            const file = item.getAsFile()
            setErrors([
              {
                message: "El archivo no es valido!",
                type: file.type,
                filename: file?.name,
              },
            ])
          }
        })
      } else {
        // Use DataTransfer interface to access the file(s)
        ;[...event.dataTransfer.files].forEach((file, i) => {
          console.log(`… file[${i}].name = ${file.name}`)
        })
      }
    } else {
      if (event.dataTransfer.items) {
        // Use DataTransferItemList interface to access the file(s)
        // console.log(event.dataTransfer.items[0]) //kind:"file", type:"image/png"
        ;[...event.dataTransfer.items].forEach((item, i) => {
          if (validFile(item)) {
            // If dropped items aren't files, reject them
            if (item.kind === "file") {
              const file = item.getAsFile()
              // Create a data transfer object. Similar to what you get from a `drop` event as `event.dataTransfer`
              const dataTransfer = new DataTransfer()
              // Add your file to the file list of the object
              dataTransfer.items.add(file)
              // Set your input `files` to the file list
              fileRef.files = dataTransfer.files
              setInputFile(file)
            }
          } else {
            const file = item.getAsFile()
            setErrors([
              {
                message: "El archivo no es valido!",
                type: file.type,
                filename: file?.name,
              },
            ])
          }
        })
      } else {
        // Use DataTransfer interface to access the file(s)
        ;[...event.dataTransfer.files].forEach((file, i) => {
          console.log(`… file[${i}].name = ${file.name}`)
        })
      }
    }
  }
  //previene que el navegador abra el archivo
  const handlerDragOver = (event) => {
    event.preventDefault()
  }
  //elimina el archivo al hacer click en el botón borrar
  //replantear el borrar el archivo, si es un solo archivo o multiple
  //si es multiple hay que manejar los archivos de a uno
  const handleClickDeleteFile = (index) => {
    //modal de confirmacion de borrar la wea
    setInputFile(null)
    setErrors(null)
    fileRef.current.value = null
  }
  //valida el tipo de archivos
  const validFile = (file) => {
    console.log(file)
    // console.log(validData)
    return validData.includes(file.type)
  }

  return {
    files: inputFile,
    ref: fileRef,
    errors,
    dragOver: handlerDragOver,
    dropInDropzone: handleDropInDropzone,
    deleteFile: handleClickDeleteFile,
    changeInputFile: handleChangeInputFiles,
    openDropzone: handleClickDropzone,
  }
}

export default useDropzone
