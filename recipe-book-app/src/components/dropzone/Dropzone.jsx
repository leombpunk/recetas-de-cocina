import { CameraIcon, XMarkIcon } from "@heroicons/react/24/outline"
import useDropzone from "./useDropzone"

//manejar el tamaño del dropzone

const Dropzone = ({ isMultiple = false }) => {
  const {
    ref,
    files,
    errors,
    changeInputFile,
    deleteFile,
    dragOver,
    dropInDropzone,
    openDropzone,
  } = useDropzone({ isMultiple })

  console.log(errors)

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
              onDragOver={(e) => dragOver(e)}
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
