import { useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import {
  BookOpenIcon,
  CheckIcon,
  NoSymbolIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline"
import IngredientsList from "../dragableLists/ingredientsList"
import StepsList from "../dragableLists/stepsList"
import Dropzone from "../../components/dropzone/Dropzone"
import useFiles from "../../hooks/useFiles"
import { getRecipeLocal } from "../../utils/RecipeLocal"
import recipeSchema from "../../utils/RecipeResolver"

const RecipeForm = ({
  title = "",
  handleNotification = null,
  data = null,
  handleSave,
  handleDelete,
}) => {
  const { files, uploadFiles, deleteFiles } = useFiles()
  const [editMode, setEditMode] = useState(false)
  const [portada, setPortada] = useState(null)
  const [pasosImg, setPasosImg] = useState(null)

  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    setError,
    reset,
    watch,
  } = useForm({
    defaultValues: {
      id: 0,
      titulo: "",
      imagen: "",
      detalle: "",
      comensales: "",
      duracion: "",
      ingredientes: [{name:""}], //[{ orden: 0, ingrediente: "", cantidad: "" }]
      pasos: [{ paso: "", imagen: "" }], //[{ orden: 0, paso: "", imagen: "" }]
      checked: 0,
      visibilidad: 0,
    },
    values: {
      id: data.id,
      titulo: data.titulo,
      imagen: data.imagen,
      detalle: data.detalle,
      comensales: data.comensales,
      duracion: data.duracion,
      ingredientes: data.ingredientes, 
      pasos: data.pasos, 
      checked: data.checked,
      visibilidad: data.visibilidad,
    },
    resolver: yupResolver(recipeSchema),
  })

  console.log(watch())

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
    if (error) {
      handleNotification({
        message: `${error[0]?.message}. Archivo: ${
          error[0]?.filename
        }, Formato: ${error[0]?.type || "desconocido"}`,
        type: "error",
      })
    }
  }

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
            title='Guardar receta'
            onClick={(e) => handleClickSaveBtn(e)}
          >
            <CheckIcon className='h-7 w-7' />
          </button>
          <button
            style={{ display: `${editMode ? "none" : ""}` }}
            className='bg-orange-500 rounded-lg p-1.5 hover:scale-105 duration-500'
            type='button'
            title='Editar receta'
            onClick={(e) => handleClickEditBtn(e)}
          >
            <PencilSquareIcon className='h-7 w-7' />
          </button>
          <button
            style={{ display: `${!editMode ? "none" : ""}` }}
            className='bg-orange-500 rounded-lg p-1.5 hover:scale-105 duration-500'
            type='button'
            title='Cancelar acción'
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
            title='Borrar receta'
            onClick={(e) => handleClickDeleteBtn(e)}
          >
            <TrashIcon className='h-7 w-7' />
          </button>
        </div>
      </div>
      <div className='bg-orange-200 rounded-lg mt-4'>
        <form
          autoComplete='off'
          className='flex flex-col gap-3 items-center p-4 w-full'
          id='recipeForm'
          name='recipeForm'
          onSubmit={() => handleSubmit()}
        >
          <Dropzone
            isMultiple={false}
            maxFiles={1}
            handleFiles={setPortada}
            handleUpload={handleUploadFile}
            handleError={handleErrorFile}
            disabled={!editMode}
          />
          <input
            type='text'
            placeholder='Titulo de la Receta'
            className={`${!editMode?'bg-orange-200 text-gray-600 hover:cursor-not-allowed':'bg-orange-100 shadow-black/50 shadow-sm'} rounded-lg placeholder:font-semibold placeholder:text-lg text-lg w-full`}
            name='titulo'
            id='titulo'
            {...register("titulo")}
            disabled={!editMode}
          />
          <textarea
            placeholder='Descripcion de la receta...'
            className={`${!editMode?'bg-orange-200 text-gray-600 hover:cursor-not-allowed':'bg-orange-100 shadow-black/50 shadow-sm'} rounded-lg placeholder:font-semibold placeholder:text-lg text-lg w-full`}
            name='detalle'
            id='detalle'
            rows={4}
            {...register("detalle")}
            disabled={!editMode}
          ></textarea>
          <div className='grid w-full gap-x-3 grid-cols-2 grid-rows-1 items-center'>
            <input
              type='text'
              placeholder='Cantidad de porciones/personas'
              className={`${!editMode?'bg-orange-200 text-gray-600 hover:cursor-not-allowed':'bg-orange-100 shadow-black/50 shadow-sm'} rounded-lg placeholder:font-semibold placeholder:text-lg text-lg w-full`}
              name='comensales'
              id='comensales'
              {...register("comensales")}
              disabled={!editMode}
            />
            <input
              type='text'
              placeholder='Tiempo de preparación'
              className={`${!editMode?'bg-orange-200 text-gray-600 hover:cursor-not-allowed':'bg-orange-100 shadow-black/50 shadow-sm'} rounded-lg placeholder:font-semibold placeholder:text-lg text-lg w-full`}
              name='duracion'
              id='duracion'
              {...register("duracion")}
              disabled={!editMode}
            />
          </div>
          <IngredientsList control={control} register={register} errors={errors} editMode={editMode} />
          <StepsList control={control} register={register} errors={errors} editMode={editMode} />
        </form>
      </div>
    </>
  )
}

export default RecipeForm
