/* eslint-disable react-hooks/exhaustive-deps */
import { CameraIcon, XMarkIcon } from "@heroicons/react/24/outline"
import useDropzone from "./useDropzone"
import { useEffect } from "react"
import { RoutesAPI } from "../../utils/RoutesAPI"
import { useContextUser } from "../../providers/UserProvider"

//manejar el tamaño del dropzone
/**
 *
 * @param {*} isMultiple(boolean): especifíca si se quiere renderizar un 'input[type="file"]' con el atributo 'multiple' o 'single', por defecto el valor es *'false'*
 * @param {*} maxFiles(integer): establece el máximo de archivos para el input, por defecto el valor es *'1'*
 * @param {*} handleUpload(function): executa la funcion para cargar archivos, recibe un array de archivos
 * @param {*} handleDelete(function): executa la funcion para eliminar archivos, recibe un array de archivos
 * @param {*} handleError(function): pasa un mensaje si algo sale mal
 * @param {*} handleFiles(function): pasa un array con los archivos del input
 * @param {*} disabled(boolean): activa/desactiva el componente y sus metodos
 * @param {*} filePreload(stringArray/string): pasa un archivo o varios que ya estan almacenados en algún servidor
 * @returns
 */
const Dropzone = ({
  title = '',
  isMultiple = false,
  maxFiles = 1,
  handleUpload,
  handleError,
  handleFiles,
  handleDelete,
  disabled,
  filePreload,
  index = undefined,
}) => {
  const {user} = useContextUser()
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

  console.log({ filePreload: filePreload, f:files })

  const handleClickDelete = (e) => {
    e.preventDefault()
    //comprobar si filePreload es distinto de null
    if (filePreload) {
      console.log("estoy en filepreload")
      handleDelete(filePreload, index)
    }
    //o si files es distinto de null
    if (files) {
      console.log("estoy en files")
      deleteFile()
    }
  }

  useEffect(() => {
    if (files === null) {
      // handleDelete()
    } else {
      handleFiles(files)
      //funciona, pero debería comprobar si index es distinto de undefined
      //para enviarlo o no como parámetro de la función
      handleUpload(files, index)
    }
  }, [files])

  useEffect(() => {
    handleError(errors)
  }, [errors])

  return (
    <>
      <figure className='w-full'>
        {files || filePreload ? (
          isMultiple ? null : (
            <div className='flex flex-row justify-center w-full'>
              <div
                className='w-9/12 h-96 bg-cover bg-center rounded-lg border border-gray-500 border-dashed'
                title='Imagen descriptiva del paso'
                style={{
                  backgroundImage: `url(${filePreload ? 
                    RoutesAPI.public.concat("/",user.usuario,"/", filePreload) :
                    URL.createObjectURL(files)
                  }`,
                  filter: `${!disabled ? "none" : "grayscale(100%)"}`,
                }}
              >
                <div className='relative flex flex-row justify-end'>
                  <button
                    type='button'
                    disabled={disabled}
                    className={`${
                      !disabled
                        ? "bg-red-500 hover:cursor-pointer hover:scale-105 duration-500 rounded-lg"
                        : "hidden"
                    }`}
                    onClick={(e) => handleClickDelete(e)}
                  >
                    <XMarkIcon
                      className='h-8 w-8 p-0.5 text-white'
                      title='Borrar'
                      fontWeight={700}
                    />
                  </button>
                </div>
              </div>
            </div>
          )
        ) : (
          <div className='flex flex-row items-center justify-center w-full'>
            <div
              className={`${
                !disabled ? "hover:cursor-pointer" : "hover:cursor-not-allowed"
              } flex flex-col items-center border border-gray-500 w-9/12 h-96 p-6 rounded-lg border-dashed `}
              onClick={() => {
                if (!disabled) {
                  openDropzone()
                }
              }}
              onDrop={(e) => {
                if (!disabled) {
                  dropInDropzone(e)
                }
              }}
              onDragOver={(e) => {
                if (!disabled) {
                  dragOver(e)
                }
              }}
            >
              <p className='w-full text-right text-gray-500'>
                <b>
                  Máximo:{" "}
                  <i>
                    <span>{maxFiles}</span> archivo(s)
                  </i>
                </b>
              </p>
              <CameraIcon className='h-36 w-36 text-gray-500 m-auto' />
              <p className='italic text-gray-500 font-semibold text-base text-center'>
                {title}
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
        disabled={disabled}
      />
    </>
  )
}

export default Dropzone
