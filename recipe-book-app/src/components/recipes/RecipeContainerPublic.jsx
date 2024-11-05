import { Fragment, useEffect } from "react"
import { Menu, Transition } from "@headlessui/react"
import { useSearchParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import {
  CheckIcon,
  ArchiveBoxXMarkIcon,
  PlusIcon,
} from "@heroicons/react/24/outline"
import Loader from "../../components/loader/Loader"
import RecipeCard from "./RecipeCard"
import Pagination from "../pagination/Pagination"
import NavigationRoutes from "../../utils/NavigationRoutes"
import { useContextNotification } from "../../providers/NotificationProvider"
import useRecipesSearch from "../../hooks/useRecipesSearch"
import { XMarkIcon } from "@heroicons/react/20/solid"

const RecipeContainerPublic = () => {
  const { addNotification } = useContextNotification()
  const { loading, recipes, errors, totalPages, totalRows, filters } =
    useRecipesSearch()
  const [searchParams, setSearchParams] = useSearchParams()
  const { register, handleSubmit, reset } = useForm({
    defaultValues: { likes: "ASC", order: "ASC" },
  })

  useEffect(() => {
    const searchValue = searchParams.get("search")
    if (filters.search !== searchValue && searchValue) {
      filters.setSearch(searchValue)
    }
  }, [searchParams, filters])

  useEffect(() => {
    const usernameValue = searchParams.get("username")
    if (filters.username !== usernameValue && usernameValue) {
      filters.setUsername(usernameValue)
    }
  }, [searchParams, filters])

  useEffect(() => {
    if (errors.length) {
      addNotification({ message: "Algo malio sal!", type: "error" })
    }
  }, [errors, addNotification])

  const onSubmitForm = (data, e) => {
    // console.log(e)
    e.preventDefault()
    // console.log(data)
    // filters.setSearch(data.search)
    filters.setOrder(data.order)
  }

  const handleClickBadge = (event) => {
    event.preventDefault()
    setSearchParams("")
    // console.log(searchParams.values())
    filters.setUsername("")
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className='bg-orange-300 min-h-[60svh]'>
          <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
            <div className='sticky top-0 z-10 flex flex-col bg-orange-300 py-4 border-b border-gray-500'>
              {filters.username?.length ? (
                <>
                  {/* <h2 className='w-full text-3xl font-bold tracking-tight text-gray-900'>
                    Recetas del usuario "{filters.username}"
                  </h2> */}
                  <span className='flex flex-row justify-around bg-orange-400 max-w-xs p-1 rounded-2xl font-medium text-lg'>
                    Recetas del usuario "{filters.username}"
                    <button
                      type='button'
                      title='Quitar filtro de usuario'
                      className=' p-1 rounded-full hover:bg-orange-500 hover:shadow-md hover:shadow-black/50 duration-300'
                      onClick={(e) => handleClickBadge(e)}
                    >
                      <XMarkIcon className='w-5 h-5 ' />
                    </button>
                  </span>
                </>
              ) : (
                ""
              )}
              <div className='flex flex-col lg:flex-row items-center'>
                <h2 className='w-full text-3xl font-bold tracking-tight text-gray-900'>
                  {filters.search?.length
                    ? `Mostrando resultados para "${filters.search}"`
                    : `Mostrando todas las recetas`}
                </h2>
                <div className='flex flex-row items-center gap-2 justify-end w-full pb-3 pt-6'>
                  <form
                    onSubmit={handleSubmit(onSubmitForm)}
                    className='flex flex-row items-center gap-3 w-full'
                  >
                    <div className='flex flex-col w-full md:flex-row gap-3'>
                      <select
                        {...register("likes")}
                        className='rounded-lg text-gray-500'
                      >
                        <option value={"ASC"} defaultValue>
                          Ordenar por likes
                        </option>
                        <option value={"ASC"}>Ascendente</option>
                        <option value={"DESC"}>Descendente</option>
                      </select>
                      <select
                        {...register("order")}
                        className='rounded-lg text-gray-500'
                      >
                        <option value={"ASC"} defaultValue>
                          Ordenar por titulo
                        </option>
                        <option value={"ASC"}>Ascendente</option>
                        <option value={"DESC"}>Descendente</option>
                      </select>
                    </div>

                    <div className='flex flex-col md:flex-row gap-3'>
                      <button
                        disabled={false}
                        type='submit'
                        className='flex flex-row items-center bg-orange-500 font-semibold p-2 border border-orange-700 rounded-lg hover:scale-105 shadow-md hover:shadow-black/50 duration-500'
                      >
                        <CheckIcon className='h-6 w-6' />
                        Filtrar
                      </button>
                      <div className="flex flex-row gap-3">

                        <button
                          title='Limpiar campos'
                          onClick={() => reset()}
                          disabled={false}
                          type='button'
                          className='bg-red-500 font-semibold p-2 border border-orange-700 rounded-lg hover:scale-105 shadow-md hover:shadow-black/50 duration-500'
                        >
                          <ArchiveBoxXMarkIcon className='h-6 w-6' />
                        </button>
                        <Menu
                          as={"div"}
                          className='relative inline-block text-left'
                        >
                          <Menu.Button
                            title='Filtros de búsqueda'
                            className={`${
                              loading
                                ? "bg-gray-500 hover:cursor-not-allowed border-gray-700"
                                : "bg-orange-500 border-orange-700"
                            } inline-flex p-2 border rounded-lg hover:scale-105 shadow-md hover:shadow-black/50 duration-500`}
                            disabled={loading}
                          >
                            <PlusIcon className='h-6 w-6' />
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
                            <Menu.Items className='absolute right-0 mt-3 origin-top-right rounded-lg bg-orange-100 shadow-lg p-3 ring-1 ring-black/5 focus:outline-none'></Menu.Items>
                          </Transition>
                        </Menu>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className='mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 px-1'>
              {recipes.length ? (
                recipes.map((recipe, index) => (
                  <RecipeCard
                    recipe={recipe}
                    key={`recipe-card-${index}`}
                    navigation={`${NavigationRoutes.Search}/recipe`}
                    linkActive={true}
                  ></RecipeCard>
                ))
              ) : (
                <div>Sin resultados</div>
              )}
            </div>
            <Pagination
              page={filters.page}
              totalPages={totalPages}
              totalRows={totalRows}
              setPage={filters.setPage}
              isDisabled={loading}
            />
          </div>
        </div>
      )}{" "}
    </>
  )
}

export default RecipeContainerPublic
