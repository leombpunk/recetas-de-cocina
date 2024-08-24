import { useRef, useState } from "react"
import { CameraIcon, XMarkIcon } from "@heroicons/react/24/outline"

//manejar el tamaño del dropzone

const Dropzone = ({ isMultiple = false }) => {
  const [inputFile, setInputFile] = useState(null)
  const fileRef = useRef(null)

  const onClickDropzone = () => {
    fileRef.current.click()
  }
  const onChangeInputFiles = (event) => {
    // console.log(event.target.files)
    isMultiple
      ? setInputFile([...inputFile, event.target.files[0]])
      : setInputFile(event.target.files[0])
  }
  const onDropInDropzone = (event) => {
    event.preventDefault()
    // console.log(event)

    if (event.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      // console.log(event.dataTransfer.items[0]) //kind:"file", type:"image/png"
      [...event.dataTransfer.items].forEach((item, i) => {
        // If dropped items aren't files, reject them
        if (item.kind === "file") {
          const file = item.getAsFile()
          // fileRef.current.setValue(file)

          // Create a data transfer object. Similar to what you get from a `drop` event as `event.dataTransfer`
          const dataTransfer = new DataTransfer();
          // Add your file to the file list of the object
          dataTransfer.items.add(file);
          // Set your input `files` to the file list
          fileRef.files = dataTransfer.files;

          console.log(file)
          setInputFile(file)
        }
      });
    } else {
      // Use DataTransfer interface to access the file(s)
      [...event.dataTransfer.files].forEach((file, i) => {
        console.log(`… file[${i}].name = ${file.name}`);
      });
    }
  }
  const handlerDragOver = (event) => {
    event.preventDefault();
  }
  const onClickDeleteFile = () => {
    //modal de confirmacion de borrar la wea
    setInputFile(null)
    fileRef.current.value = null
  }
  const validFile = () => {}

  // console.log(fileRef.current.value)

  return (
    <>
      <figure className='w-full'>
        {inputFile ? (
          <div className='flex flex-row justify-center w-full'>
            {/* <img
              alt='imagen descriptiva del paso'
              title='Imagen descriptiva del paso'
              src={URL.createObjectURL(inputFile)} 
              className='w-9/12 h-96 object-cover rounded-lg border border-gray-500 border-dashed hover:cursor-pointer'
            /> */}
            <div
              className='w-9/12 h-96 bg-cover rounded-lg border border-gray-500 border-dashed'
              title='Imagen descriptiva del paso'
              style={{
                backgroundImage: `url(${URL.createObjectURL(inputFile)}`,
              }}
            >
              <div
                className='relative flex flex-row justify-end'
                onClick={() => onClickDeleteFile()}
              >
                <XMarkIcon
                  className='h-8 w-8 p-0.5 text-white bg-red-500 hover:cursor-pointer hover:scale-105 duration-500 rounded-lg'
                  title='Borrar'
                  fontWeight={700}
                />
              </div>
            </div>
            {/* <div className="relative right-40" onClick={() => onClickDeleteFile()}>
              <XMarkIcon className="h-7 w-7 text-white bg-red-500 hover:scale-105 duration-500 rounded-lg" title='Borrar' />
            </div> */}
          </div>
        ) : (
          <div className='flex flex-row items-center justify-center w-full'>
            <div
              className='flex flex-col items-center border border-gray-500 w-9/12 h-96 p-6 rounded-lg border-dashed hover:cursor-pointer'
              onClick={() => onClickDropzone()}
              onDrop={(e) => onDropInDropzone(e)}
              onDragOver={(e) => handlerDragOver(e)}
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
        accept='image/png, image/jpeg'
        style={{ display: "none" }}
        // hidden //funciona con ambos (hidden/style)
        {...(isMultiple ? "multiple" : "")}
        onChange={(e) => onChangeInputFiles(e)}
        ref={fileRef}
      />
    </>
  )
}

export default Dropzone
