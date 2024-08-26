// import { useRef, useState } from "react"
import { CameraIcon, XMarkIcon } from "@heroicons/react/24/outline"
import useDropzone from "./useDropzone"

//manejar el tamaño del dropzone

const Dropzone = ({ isMultiple = false }) => {
  // const [inputFile, setInputFile] = useState(null)
  // const fileRef = useRef(null)
  const {
    ref,
    files,
    changeInputFile,
    deleteFile,
    dragover,
    dropInDropzone,
    openDropzone,
  } = useDropzone({ isMultiple })

  // const handleClickDropzone = () => {
  //   fileRef.current.click()
  // }
  // const handleChangeInputFiles = (event) => {
  //   isMultiple
  //     ? setInputFile([...inputFile, event.target.files[0]])
  //     : setInputFile(event.target.files[0])
  // }
  // const handleDropInDropzone = (event) => {
  //   event.preventDefault()

  //   if (event.dataTransfer.items) {
  //     // Use DataTransferItemList interface to access the file(s)
  //     // console.log(event.dataTransfer.items[0]) //kind:"file", type:"image/png"
  //     ;[...event.dataTransfer.items].forEach((item, i) => {
  //       // If dropped items aren't files, reject them
  //       if (item.kind === "file") {
  //         const file = item.getAsFile()

  //         // Create a data transfer object. Similar to what you get from a `drop` event as `event.dataTransfer`
  //         const dataTransfer = new DataTransfer()
  //         // Add your file to the file list of the object
  //         dataTransfer.items.add(file)
  //         // Set your input `files` to the file list
  //         fileRef.files = dataTransfer.files

  //         console.log(file)
  //         setInputFile(file)
  //       }
  //     })
  //   } else {
  //     // Use DataTransfer interface to access the file(s)
  //     ;[...event.dataTransfer.files].forEach((file, i) => {
  //       console.log(`… file[${i}].name = ${file.name}`)
  //     })
  //   }
  // }
  // const handlerDragOver = (event) => {
  //   event.preventDefault()
  // }
  // const handleClickDeleteFile = () => {
  //   //modal de confirmacion de borrar la wea
  //   setInputFile(null)
  //   fileRef.current.value = null
  // }
  // const validFile = (file) => {}

  return (
    <>
      <figure className='w-full'>
        {files ? (
          <div className='flex flex-row justify-center w-full'>
            <div
              className='w-9/12 h-96 bg-cover bg-center rounded-lg border border-gray-500 border-dashed'
              title='Imagen descriptiva del paso'
              style={{
                backgroundImage: `url(${URL.createObjectURL(files)}`,
              }}
            >
              <div
                className='relative flex flex-row justify-end'
                onClick={() => deleteFile()}
              >
                <XMarkIcon
                  className='h-8 w-8 p-0.5 text-white bg-red-500 hover:cursor-pointer hover:scale-105 duration-500 rounded-lg'
                  title='Borrar'
                  fontWeight={700}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className='flex flex-row items-center justify-center w-full'>
            <div
              className='flex flex-col items-center border border-gray-500 w-9/12 h-96 p-6 rounded-lg border-dashed hover:cursor-pointer'
              onClick={() => openDropzone()}
              onDrop={(e) => dropInDropzone(e)}
              onDragOver={(e) => dragover(e)}
            >
              <CameraIcon className='h-36 w-36 text-gray-500 m-auto' />
              <p className='italic text-gray-500 font-semibold text-base text-center'>
                Agrega una imagen para la portada de la receta
              </p>
            </div>
          </div>
        )}
      </figure>
      <input
        type='file'
        id='filePortada'
        name='filePortada'
        accept='image/png, image/jpeg, image/webp'
        style={{ display: "none" }}
        // hidden //funciona con ambos (hidden/style)
        {...(isMultiple ? "multiple" : "")}
        onChange={(e) => changeInputFile(e)}
        ref={ref}
      />
    </>
  )
}

export default Dropzone
