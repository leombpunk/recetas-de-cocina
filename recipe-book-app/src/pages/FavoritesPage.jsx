import { Fragment, useEffect, useState } from "react"
import useSaves from "../hooks/useSaves"
// import { useContextUser } from "../providers/UserProvider"
import { BookmarkIcon } from "@heroicons/react/24/solid"
import Pagination from "../components/pagination/Pagination"
import {
  AdjustmentsHorizontalIcon,
  ArchiveBoxXMarkIcon,
  CheckIcon,
  // NoSymbolIcon,
  // TrashIcon,
} from "@heroicons/react/24/outline"
import { Menu, Transition } from "@headlessui/react"
import { useForm } from "react-hook-form"
import Loader from "../components/loader/Loader"
import RecipeCard from "../components/recipes/RecipeCard"
import NavigationRoutes from "../utils/NavigationRoutes"
import { useContextNotification } from "../providers/NotificationProvider"

const FavoritesPage = () => {
  // const { user } = useContextUser()
  const { addNotification } = useContextNotification()
  const {
    recipes,
    fetch,
    errors,
    setOrder,
    setPage,
    // setReload,
    setSearch, totalPages, totalRows, page,
  } = useSaves()
  // eslint-disable-next-line no-unused-vars
  const [editMode, setEditMode] = useState(false)
  const { register, reset, handleSubmit } = useForm({
    defaultValues: {},
  })

  // const handleClickEditMode = () => {
  //   setEditMode(!editMode)
  // }

  const onSubmitForm = (data) => {
    console.log(data)
    //completar esta garcha
    setSearch(data.search)
    setOrder(data.order)
    setPage(1)
  }

  useEffect(() => {
    if (errors.length) {
      addNotification({ message: "Se produjo un error, intentelo de nuevo", type: "error" })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[errors])

  return (
    <main className='bg-orange-300 min-h-[60svh]'>
      <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
        <div className='sticky top-0 z-10 flex flex-row items-center bg-orange-300 py-4'>
          <h2 className='flex flex-row items-center gap-2 w-full text-3xl font-bold tracking-tight text-gray-900'>
            <BookmarkIcon className='w-8 h-8 text-gray-900' /> Mis favoritos
          </h2>
          <div className='flex flex-row gap-2 justify-end w-full'>
            <div id='buttonsEditMode' className='self-center'>
              {!editMode ? (
                <>
                  {/* <button
                    disabled={editMode}
                    onClick={() => handleClickEditMode()}
                    title='Cambiar estado'
                    className={`bg-orange-500 p-2 border border-orange-700 rounded-lg hover:scale-105 shadow-md hover:shadow-black/50 duration-500`}
                  >
                    <TrashIcon className='h-6 w-6' />
                  </button> */}
                </>
              ) : (
                <div className='flex flex-row gap-2'>
                  {/* <button
                        title='Confirmar acción'
                        className={`bg-orange-500 p-2 border border-orange-700 rounded-lg hover:scale-105 shadow-md hover:shadow-black/50 duration-500`}
                        onClick={() => handaleClickShared()}
                      >
                        <CheckIcon className='h-6 w-6' />
                      </button> */}
                  {/* <button
                    title='Cancelar acción'
                    className={`bg-orange-500 p-2 border border-orange-700 rounded-lg hover:scale-105 shadow-md hover:shadow-black/50 duration-500`}
                    onClick={() => handleClickEditMode()}
                  >
                    <NoSymbolIcon className='h-6 w-6' />
                  </button> */}
                </div>
              )}
            </div>
            <Menu as={"div"} className='relative inline-block text-left'>
              <Menu.Button
                title='Filtros de búsqueda'
                className={`${
                  editMode
                    ? "bg-gray-500 hover:cursor-not-allowed border-gray-700"
                    : "bg-orange-500 border-orange-700"
                } inline-flex p-2 border rounded-lg hover:scale-105 shadow-md hover:shadow-black/50 duration-500`}
                disabled={editMode}
              >
                <AdjustmentsHorizontalIcon className='h-6 w-6' />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter='transition ease-out duration-100'
                enterFrom='transform opacity-0 scale-95'
                enterTo='transform opacity-100 scale-100'
                leave='transition ease-in duration-75'
                leaveFrom='transform opacity-100 scale-100'
                leaveTo='transform opacity-0 scale-95'
              >
                <Menu.Items className='absolute right-0 mt-3 origin-top-right rounded-lg bg-orange-100 shadow-lg p-3 ring-1 ring-black/5 focus:outline-none'>
                  <form
                    onSubmit={handleSubmit(onSubmitForm)}
                    className='flex flex-col lg:flex-row items-center gap-3 w-full min-w-[280px] md:min-w-[450px] lg:min-w-[850px] md:max-w-full'
                  >
                    <input
                      type='text'
                      placeholder='Titulo de receta'
                      className='rounded-lg placeholder:text-gray-500 w-full'
                      {...register("search")}
                    />
                    <select
                      {...register("order")}
                      className='rounded-lg text-gray-500 w-full'
                    >
                      <option value={"ASC"} defaultValue>
                        Ordenar por fecha
                      </option>
                      <option value={"ASC"}>Ascendente</option>
                      <option value={"DESC"}>Descendente</option>
                    </select>
                    <div className='flex flex-row gap-3 self-end'>
                      <button
                        disabled={false}
                        type='submit'
                        className='flex flex-row self-end items-center bg-orange-500 font-semibold p-2 border border-orange-700 rounded-lg hover:scale-105 shadow-md hover:shadow-black/50 duration-500'
                      >
                        <CheckIcon className='h-6 w-6' />
                        Filtrar
                      </button>
                      <button
                        title='Limpiar campos'
                        onClick={() => reset()}
                        disabled={false}
                        type='button'
                        className='bg-red-500 self-end font-semibold p-2 border border-orange-700 rounded-lg hover:scale-105 shadow-md hover:shadow-black/50 duration-500'
                      >
                        <ArchiveBoxXMarkIcon className='h-6 w-6' />
                      </button>
                    </div>
                  </form>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
        <div className='mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 px-1'>
          {fetch ? <Loader /> : recipes.length ? (
                recipes.map((recipe, index) => (
                  <RecipeCard
                    recipe={recipe.receta}
                    key={`recipe-card-${index}`}
                    navigation={NavigationRoutes.Recipes}
                    linkActive={!editMode}
                  >
                    {/* <div
                      className={`checkbox-wrapper-18 ${
                        editMode ? "" : "hidden"
                      }`}
                    >
                      <div className='round'>
                        {formShared.setValue(`recetas.${index}.id`, recipe.id)}
                        <input
                          type='checkbox'
                          id={`checkbox-${index}`}
                          {...formShared.register(
                            `recetas.${index}.visibilidad`
                          )}
                        />
                        <label htmlFor={`checkbox-${index}`}></label>
                        {formShared.setValue(`recetas.${index}.visibilidad`,recipe.visibilidad)}
                      </div>
                    </div> */}
                  </RecipeCard>
                ))
              ) : (
                <div>Sin resultados</div>
              )}
        </div>
        <Pagination
          page={page}
          totalPages={totalPages}
          totalRows={totalRows}
          setPage={setPage}
          isDisabled={editMode}
        />
      </div>
    </main>
  )
}

export default FavoritesPage
