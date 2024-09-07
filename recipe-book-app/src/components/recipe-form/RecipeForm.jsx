import {
  BookOpenIcon,
  CheckIcon,
  NoSymbolIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline"
import { useState } from "react"
import { useForm } from "react-hook-form"
import IngredientsList from "../dragableLists/ingredientsList"
import StepsList from "../dragableLists/stepsList"
import Dropzone from "../../components/dropzone/Dropzone"
import useFiles from "../../hooks/useFiles"
import { getUserLocalStorage } from "../../utils/Token"
import { getRecipeLocal } from "../../utils/RecipeLocal"

const RecipeForm = ({ title = "", handleNotification, data, handleSave, handleUpdate, handleDelete }) => {
  const { files, uploadFiles, deleteFiles } = useFiles()
  const [editMode, setEditMode] = useState(false)
  const [portada, setPortada] = useState(null)
  // console.log({ portada: portada })

  const handlePortadaUpload = async (file) => {
    if (file) {
      // console.log(file)
      const result = await uploadFiles(file) //faltaria el usuario id y la receta id
      // console.log(result)
    }
    // file
    //   ? handleNotification({
    //       message: `se subió un archivo. ${file?.name}`,
    //       type: "success",
    //     })
    //   : handleNotification({
    //       message: `se eliminó el archivo.`,
    //       type: "error",
    //     })
  }

  const handleUploadFile = async (file) => {
    if (file) {
      const recipe = JSON.parse(getRecipeLocal())
      // console.log(recipe)
      // if (token & recipe) {
        // alert("ola k ase!")
        const result = await uploadFiles(recipe.id, file) //ponele
        console.log(result)
        return result
      // }
    }
  }
  
  //que mierda hace esto?
  //recibe un mensaje, tipo y detalle para mostrar una notificacion al usuario
  //por si algo sale mal, ej el usuario quiere subir un documento de texto
  //pero el dropzone solo acepta imagenes, le informaria el error
  const handleErrorFile = (error) => {
    if (error){
      handleNotification({
        message: `${error[0]?.message}. Archivo: ${
          error[0]?.filename
        }, Formato: ${error[0]?.type || "desconocido"}`,
        type: "error",
      })
    }
  }

  const [pasosImg, setPasosImg] = useState(null)

  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    setError,
    watch,
  } = useForm({
    defaultValues: {
      titulo: "",
      descripcion: "",
      portada: "",
      comensales: "",
      duracion: "",
      ingredientes: [{ orden: "", ingrediente: "", cantidad: "" }],
      pasos: [{ orden: "", paso: "", imagen: "" }],
    },
  })

  const handleClickEditBtn = (event) => {
    event.preventDefault()
    setEditMode(!editMode)
  }
  const handleClickSaveBtn = (event) => {
    event.preventDefault()
    setEditMode(!editMode)
  }
  const handleClickCancelBtn = (event) => {
    event.preventDefault()
    setEditMode(!editMode)
  }
  const handleClickDeleteBtn = (event) => {
    event.preventDefault()
    // setEditMode(!editMode)
  }

  return (
    <>
      <div className='flex flex-row items-center justify-between'>
        <h3 className='flex flex-row items-center gap-1 text-3xl font-semibold'>
          <BookOpenIcon className='h-7 w-7' /> {title}
        </h3>
        <div className='flex flex-row items-center gap-2'>
          <button
            style={{ display: `${!editMode ? "none" : ""}` }}
            className='bg-orange-500 rounded-lg p-1.5 hover:scale-105 duration-500'
            type='button'
            title='Guardar'
            onClick={(e) => handleClickSaveBtn(e)}
          >
            <CheckIcon className='h-7 w-7' />
          </button>
          <button
            style={{ display: `${editMode ? "none" : ""}` }}
            className='bg-orange-500 rounded-lg p-1.5 hover:scale-105 duration-500'
            type='button'
            title='Editar'
            onClick={(e) => handleClickEditBtn(e)}
          >
            <PencilSquareIcon className='h-7 w-7' />
          </button>
          <button
            style={{ display: `${!editMode ? "none" : ""}` }}
            className='bg-orange-500 rounded-lg p-1.5 hover:scale-105 duration-500'
            type='button'
            title='Cancelar'
            onClick={(e) => handleClickCancelBtn(e)}
          >
            <NoSymbolIcon className='h-7 w-7' />
          </button>
          <button
            disabled={editMode ? true : false}
            className={`${
              editMode
                ? "bg-gray-500 hover:cursor-not-allowed"
                : "bg-orange-500 hover:scale-105"
            } rounded-lg p-1.5  duration-500`}
            type='button'
            title='Borrar'
            onClick={(e) => handleClickDeleteBtn(e)}
          >
            <TrashIcon className='h-7 w-7' />
          </button>
        </div>
      </div>
      <div className='bg-orange-200 rounded-lg mt-4'>
        <form
          autoComplete='off'
          className='flex flex-col gap-2 items-center p-4 w-full'
          id='recipeImageForm'
          name='recipeImageForm'
        >
          <Dropzone
            isMultiple={false}
            maxFiles={1}
            handleFiles={setPortada}
            handleUpload={handleUploadFile}
            handleError={handleErrorFile}
          />
        </form>
        <form
          autoComplete='off'
          className='flex flex-col gap-2 items-center p-4 w-full'
          id='recipeForm'
          name='recipeForm'
          onSubmit={() => handleSubmit()}
        >
          <input
            type='text'
            placeholder='Titulo de la Receta'
            className='rounded-lg placeholder:font-semibold placeholder:text-lg text-lg bg-orange-100 w-full'
            name='titulo'
            id='titulo'
            {...register("titulo")}
          />
          <textarea
            placeholder='Descripcion de la receta...'
            className='rounded-lg placeholder:font-semibold placeholder:text-lg text-lg bg-orange-100 w-full'
            name='descripcion'
            id='descripcion'
            rows={4}
            {...register("descripcion")}
          ></textarea>
          <div className='grid w-full gap-x-3 grid-cols-2 grid-rows-1 items-center'>
            <input
              type='text'
              placeholder='Cantidad de porciones/personas'
              className='rounded-lg placeholder:font-semibold placeholder:text-lg text-lg bg-orange-100 w-full'
              name='comensales'
              id='comensales'
              {...register("comensales")}
            />
            <input
              type='text'
              placeholder='Tiempo de preparación'
              className='rounded-lg placeholder:font-semibold placeholder:text-lg text-lg bg-orange-100 w-full'
              name='duracion'
              id='duracion'
              {...register("duracion")}
            />
          </div>
          <IngredientsList control={control} register={register} />
          <StepsList control={control} register={register} />
        </form>
      </div>
    </>
  )
}

export default RecipeForm
