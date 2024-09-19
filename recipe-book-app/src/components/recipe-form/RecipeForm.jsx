/* eslint-disable no-unused-vars */
import { useState } from "react"
import { useForm, useWatch } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import {
  BookOpenIcon,
  CheckIcon,
  ExclamationCircleIcon,
  NoSymbolIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline"
import IngredientsList from "../dragableLists/ingredientsList"
import StepsList from "../dragableLists/stepsList"
import Dropzone from "../../components/dropzone/Dropzone"
import useFiles from "../../hooks/useFiles"
import { getRecipeLocal, saveRecipeLocal } from "../../utils/RecipeLocal"
import recipeSchema from "../../utils/RecipeResolver"
import { useContextNotification } from "../../providers/NotificationProvider"

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
  const {addNotification} = useContextNotification()

  // console.log({ data: data })

  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    setValue,
    // setError,
    // reset,
    watch,
  } = useForm({
    defaultValues: {
      id: 0,
      titulo: "",
      imagen: "",
      detalle: "",
      comensales: "",
      duracion: "",
      ingredientes: [{ name: "" }],
      pasos: [{ paso: "", imagen: "" }],
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

  //cada vez que cambie el form se podria mandar al back, validar y guardar
  //o en todo caso crear una arrowfunction que cada vez que el usuario
  //realiza un focusout (onBlur) en el formulario de receta, si es diferente
  //a lo guardado en localStorage lo actualiza y replica en el back, si no
  //pues naa
  const formRecipeData = useWatch({ control: control }) // only re-render at the custom hook level, when firstName changes

  // console.log({ watch: watch() })

  const handlePortadaUpload = async (file) => {
    if (file) {
      const recipe = getRecipeLocal()
      const result = await uploadFiles(recipe.id, file)
      console.log(result)
      setValue("imagen", `${result?.filename || ""}`)
      saveRecipeLocal(watch())
      return result
    }
  }

  const handlePortadaDelete = async (filename) => {
    if (filename) {
      const recipe = getRecipeLocal()
      const result = await deleteFiles(recipe.id, filename)
      console.log(result)
      setValue("imagen", "")
      saveRecipeLocal(watch())
      return result
    }
  }

  //pasarle estos dos metodos al componente stepsList
  const handleUploadFileSteps = async (file, index) => {
    console.log({ i: index, f: file })
    if (file) {
      const recipe = getRecipeLocal()
      const result = await uploadFiles(recipe.id, file)
      console.log(result)
      setValue(`pasos.${index}.imagen`, `${result?.filename || ""}`)
      saveRecipeLocal(watch())
      return result
    }
  }

  const handleDeleteFilesSteps = async (filename, index) => {
    console.log({ i: index, f: filename })
    if (filename) {
      const recipe = getRecipeLocal()
      const result = await deleteFiles(recipe.id, filename)
      console.log(result)
      setValue(`pasos.${index}.imagen`, "")
      saveRecipeLocal(watch())
      return result
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
    // event.preventDefault()
    // setEditMode(!editMode)
  }
  const handleClickCancelBtn = (event) => {
    event.preventDefault()
    setEditMode(!editMode)
  }
  const handleClickDeleteBtn = (event) => {
    event.preventDefault()
    // setEditMode(!editMode)
  }

  const handleSaveForm = (data) => {
    // console.log({recetaPe:data})
    handleSave(data).then((result) => {
      console.log({resultForm:result})
    }).finally((result) => {
      console.log({resultFormFinally:result})
      addNotification({message:'Receta actualizada',type:'success'})
      setEditMode(!editMode)
    })
  }

  return (
    <>
      <form
        autoComplete='off'
        id='recipeForm'
        name='recipeForm'
        className='w-full'
        onSubmit={handleSubmit(handleSaveForm)}
      >
        <div className='flex flex-row items-center justify-between'>
          <h3 className='flex flex-row items-center gap-1 text-3xl font-semibold'>
            <BookOpenIcon className='h-7 w-7' /> {title}
          </h3>
          <div className='flex flex-row items-center gap-2'>
            <button
              style={{ display: `${!editMode ? "none" : ""}` }}
              className='bg-orange-500 rounded-lg p-1.5 hover:scale-105 duration-500'
              type='submit'
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
              disabled={editMode}
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
          <div className='flex flex-col gap-3 items-center p-4 w-full'>
            <Dropzone
              title="Agrega una imagen para la portada de la receta"
              isMultiple={false}
              maxFiles={1}
              handleFiles={setPortada}
              handleUpload={handlePortadaUpload}
              handleDelete={handlePortadaDelete}
              handleError={handleErrorFile}
              disabled={!editMode}
              filePreload={getValues("imagen")}
            />
            {errors?.imagen && (
              <span className='flex flex-row gap-1 items-center italic text-left text-red-600 font-semibold w-full pl-1'>
                <ExclamationCircleIcon className='h-6 w-6' />
                {errors.imagen.message}
              </span>
            )}
            <input
              type='text'
              placeholder='Titulo de la Receta'
              className={`${
                !editMode
                  ? "bg-orange-200 text-gray-600 hover:cursor-not-allowed"
                  : "bg-orange-100 shadow-black/50 shadow-sm"
              } rounded-lg placeholder:font-semibold placeholder:text-lg text-lg w-full ${
                errors?.titulo && "border border-red-600"
              }`}
              name='titulo'
              id='titulo'
              {...register("titulo")}
              disabled={!editMode}
            />
            {errors?.titulo && (
              <span className='flex flex-row gap-1 items-center italic text-left text-red-600 font-semibold w-full pl-1'>
                <ExclamationCircleIcon className='h-6 w-6' />
                {errors.titulo.message}
              </span>
            )}
            <textarea
              placeholder='Descripcion de la receta...'
              className={`${
                !editMode
                  ? "bg-orange-200 text-gray-600 hover:cursor-not-allowed"
                  : "bg-orange-100 shadow-black/50 shadow-sm"
              } rounded-lg placeholder:font-semibold placeholder:text-lg text-lg w-full ${
                errors?.detalle && "border border-red-600"
              }`}
              name='detalle'
              id='detalle'
              rows={4}
              {...register("detalle")}
              disabled={!editMode}
            ></textarea>
            {errors?.detalle && (
              <span className='flex flex-row gap-1 items-center italic text-left text-red-600 font-semibold w-full pl-1'>
                <ExclamationCircleIcon className='h-6 w-6' />
                {errors.detalle.message}
              </span>
            )}
            <div className='grid w-full gap-3 grid-cols-2 grid-rows-1 items-center'>
              <input
                type='text'
                placeholder='Cantidad de porciones/personas'
                className={`${
                  !editMode
                    ? "bg-orange-200 text-gray-600 hover:cursor-not-allowed"
                    : "bg-orange-100 shadow-black/50 shadow-sm"
                } rounded-lg placeholder:font-semibold placeholder:text-lg text-lg w-full ${
                  errors?.comensales && "border border-red-600"
                }`}
                name='comensales'
                id='comensales'
                {...register("comensales")}
                disabled={!editMode}
              />
              <input
                type='text'
                placeholder='Tiempo de preparación'
                className={`${
                  !editMode
                    ? "bg-orange-200 text-gray-600 hover:cursor-not-allowed"
                    : "bg-orange-100 shadow-black/50 shadow-sm"
                } rounded-lg placeholder:font-semibold placeholder:text-lg text-lg w-full ${
                  errors?.duracion && "border border-red-600"
                }`}
                name='duracion'
                id='duracion'
                {...register("duracion")}
                disabled={!editMode}
              />
              {errors?.comensales && (
                <span className='flex flex-row gap-1 items-center italic text-left text-red-600 font-semibold w-full pl-1'>
                  <ExclamationCircleIcon className='h-6 w-6' />
                  {errors.comensales?.message}
                </span>
              )}
              {errors?.duracion && (
                <span className='flex flex-row gap-1 items-center italic text-left text-red-600 font-semibold w-full pl-1'>
                  <ExclamationCircleIcon className='h-6 w-6' />
                  {errors.duracion?.message}
                </span>
              )}
            </div>
            <IngredientsList
              control={control}
              register={register}
              errors={errors}
              editMode={editMode}
            />
            <StepsList
              control={control}
              register={register}
              errors={errors}
              editMode={editMode}
              fileUpload={handleUploadFileSteps}
              fileDelete={handleDeleteFilesSteps}
              handleErrorFile={handleErrorFile}
              setPasosImg={setPasosImg}
            />
          </div>
        </div>
      </form>
    </>
  )
}

export default RecipeForm
