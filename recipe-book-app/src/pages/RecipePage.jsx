import {
  BookOpenIcon,
  CheckIcon,
  PencilSquareIcon,
  NoSymbolIcon,
  TrashIcon,
  CameraIcon,
} from "@heroicons/react/24/outline"
import IngredientsList from "../components/dragableLists/ingredientsList"
import StepsList from "../components/dragableLists/stepsList"
import Dropzone from "../components/dropzone/Dropzone"

const RecipePage = () => {
  return (
    <>
      <section className='bg-orange-300'>
        <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
          <div className='flex flex-row items-center justify-between'>
            <h3 className='flex flex-row items-center gap-1 text-3xl font-semibold'>
              <BookOpenIcon className='h-7 w-7' /> Nueva receta
            </h3>
            <div className='flex flex-row items-center gap-2'>
              <button
                className='bg-orange-500 rounded-lg p-1.5 hover:scale-105 duration-500'
                type='button'
                title='Guardar'
              >
                <CheckIcon className='h-7 w-7' />
              </button>
              <button
                className='bg-orange-500 rounded-lg p-1.5 hover:scale-105 duration-500'
                type='button'
                title='Editar'
              >
                <PencilSquareIcon className='h-7 w-7' />
              </button>
              <button
                className='bg-orange-500 rounded-lg p-1.5 hover:scale-105 duration-500'
                type='button'
                title='Cancelar'
              >
                <NoSymbolIcon className='h-7 w-7' />
              </button>
              <button
                className='bg-orange-500 rounded-lg p-1.5 hover:scale-105 duration-500'
                type='button'
                title='Borrar'
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
              {/* <figure className='w-full'>
                {false ? (
                  <img
                    alt='imagen descriptiva del paso'
                    title='Imagen descriptiva del paso'
                    src={null}
                  />
                ) : (
                  <div className='flex flex-row items-center justify-center w-full'>
                    <div className='flex flex-col items-center border border-gray-500 w-9/12 h-96 p-6 rounded-lg border-dashed hover:cursor-pointer'>
                      <CameraIcon className='h-36 w-36 text-gray-500 m-auto' />
                      <p className='italic text-gray-500 font-semibold text-base text-center'>
                        Agrega una imagen para la portada de la receta
                      </p>
                    </div>
                  </div>
                )}
              </figure>
              <input type="file" id="filePortada" name="filePortada" hidden/> */}
              <Dropzone isMultiple={false} />
            </form>
            <form
              autoComplete='off'
              className='flex flex-col gap-2 items-center p-4 w-full'
              id='recipeForm'
              name='recipeForm'
            >
              <input
                type='text'
                placeholder='Titulo de la Receta'
                className='rounded-lg placeholder:font-semibold placeholder:text-lg text-lg bg-orange-100 w-full'
                name='titulo'
                id='titulo'
              />
              <textarea
                placeholder='Descripcion de la receta...'
                className='rounded-lg placeholder:font-semibold placeholder:text-lg text-lg bg-orange-100 w-full'
                name='descripcion'
                id='descripcion'
                rows={4}
              ></textarea>
              <div className='grid w-full gap-x-3 grid-cols-2 grid-rows-1 items-center'>
                <input
                  type='text'
                  placeholder='Cantidad de porciones/personas'
                  className='rounded-lg placeholder:font-semibold placeholder:text-lg text-lg bg-orange-100 w-full'
                  name='comensales'
                  id='comensales'
                />
                <input
                  type='text'
                  placeholder='Tiempo de preparación'
                  className='rounded-lg placeholder:font-semibold placeholder:text-lg text-lg bg-orange-100 w-full'
                  name='duracion'
                  id='duracion'
                />
              </div>
              <IngredientsList />
              <StepsList />
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default RecipePage
