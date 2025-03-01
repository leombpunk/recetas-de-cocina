import { Fragment, useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { Disclosure, Menu, Transition } from "@headlessui/react"
import {
  BellIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline"
import {
  UserIcon,
  ArrowRightOnRectangleIcon,
  BookmarkIcon,
  DocumentPlusIcon,
  DocumentTextIcon,
  IdentificationIcon,
} from "@heroicons/react/24/solid"
import { useContextUser } from "../../providers/UserProvider"
import NavigationRoutes from "../../utils/NavigationRoutes"
// import { RoutesAPI } from "../../utils/RoutesAPI"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import logo from '../../assets/images/cooking-book-logo_8.png'

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

const filterSearch = ["/recipes","/recipe","/favorites"]

const Header = () => {
  const [search, setSearch] = useState("")
  const navigate = useNavigate()
  const location = useLocation()
  const { user, handleLogout } = useContextUser()

  const handleClickEndSesion = (e) => {
    e.preventDefault()
    handleLogout()
    navigate(NavigationRoutes.Home)
  }

  const handleClickSignIn = (e) => {
    e.preventDefault()
    navigate(NavigationRoutes.Login)
  }

  const handleSubmitSearch = (event) => {
    event.preventDefault()
    // console.log(event.target[0].value)
    // console.log({ buscador: search })
    navigate(`${NavigationRoutes.Search}/?search=${search}`)
    // navigate({ pathname: NavigationRoutes.Search, search: search })
  }

  // console.log({location})

  return (
    <Disclosure as='nav' className='bg-orange-500'>
      {({ open }) => (
        <>
          <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
            <div className='relative flex h-16 items-center justify-between'>
              <div className='flex flex-1 items-center sm:items-stretch sm:justify-start'>
                <Link
                  className='flex flex-shrink-0 items-center gap-2'
                  to={NavigationRoutes.Home}
                >
                  <img
                    className='h-8 w-auto hover:scale-110 duration-500'
                    src={logo}
                    alt='Cooking Book App'
                  />
                  <span className='pacifico-regular text-2xl hidden md:block'>
                    Recipe App
                  </span>
                </Link>
                {!filterSearch.includes(location.pathname) && <div className='ml-2.5 sm:ml-6 w-full'>
                  <div className='flex'>
                    <form
                      className='w-full'
                      onSubmit={(e) => handleSubmitSearch(e)}
                    >
                      <div className='relative rounded-md shadow-sm overflow-hidden'>
                        <input
                          type='search'
                          name='searchBar'
                          id='searchBar'
                          className='block w-full rounded-2xl border-0 py-1.5 pl-7 pr-12 bg-orange-300 text-gray-900 ring-1 ring-inset ring-gray-600 placeholder:text-gray-600 text-base sm:leading-6'
                          placeholder='Buscar por receta o ingrediente'
                          onChange={(event) => setSearch(event.target.value)}
                        />
                        <button
                          type='submit'
                          className='absolute inset-y-0 right-2 text-gray-600 flex items-center p-2'
                        >
                          <MagnifyingGlassIcon className='w-5 h-5 ' />
                        </button>
                      </div>
                    </form>
                  </div>
                </div>}
                
              </div>
              <div className='inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto ml-2.5 sm:ml-6 sm:pr-0 gap-2'>
                <button
                  type='button'
                  className='hidden lg:inline relative rounded-full hover:scale-125 duration-500 bg-orange-500 p-1 text-gray-900 hover:text-black focus:outline-none focus:ring-2 focus:ring-orange-700 focus:ring-offset-2 focus:ring-offset-orange-800'
                >
                  <span className='absolute -inset-1.5' />
                  <span className='sr-only'>Ver notificaciones</span>
                  <BellIcon className='h-6 w-6' aria-hidden='true' />
                </button>

                {/* Profile dropdown */}
                {user ? (
                  <Menu as='div' className='relative ml-3'>
                    <div>
                      <Menu.Button className='relative flex rounded-full hover:scale-110 duration-500 bg-orange-500 text-sm focus:outline-none focus:ring-2 focus:ring-orange-700 focus:ring-offset-2 focus:ring-offset-orange-800'>
                        <span className='absolute -inset-1.5' />
                        <span className='sr-only'>Abrir menu de usuario</span>
                        {user.urlPublica ? (
                          <img
                            className='h-10 w-10 rounded-full'
                            src={`${user.urlPublica}`}
                            alt='imagen de perfil'
                          />
                        ) : (
                          <UserCircleIcon className='h-8 w-8 bg-gray-300 rounded-full text-gray-900 hover:text-black' />
                        )}
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter='transition ease-out duration-100'
                      enterFrom='transform opacity-0 scale-95'
                      enterTo='transform opacity-100 scale-100'
                      leave='transition ease-in duration-75'
                      leaveFrom='transform opacity-100 scale-100'
                      leaveTo='transform opacity-0 scale-95'
                    >
                      <Menu.Items className='absolute right-0 z-20 mt-2 w-52 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                        <Menu.Item>
                          {({ active }) => (
                            <span
                              className={classNames(
                                active ? "bg-gray-200" : "",
                                "flex flex-row items-center gap-1 px-4 py-2 text-lg text-gray-700 font-semibold hover:cursor-default"
                              )}
                            >
                              <UserIcon className='w-5 h-5' />
                              {user.usuario}
                            </span>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "flex flex-row items-center gap-1 px-4 py-2 text-lg text-gray-700"
                              )}
                              to={NavigationRoutes.Profile}
                            >
                              <IdentificationIcon className='w-5 h-5' />
                              Perfil
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to={NavigationRoutes.Recipes}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "flex flex-row items-center gap-1 px-4 py-2 text-lg text-gray-700"
                              )}
                            >
                              <DocumentTextIcon className='w-5 h-5' />
                              Mis Recetas
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to={NavigationRoutes.RecipeCreate}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "flex flex-row items-center gap-1 px-4 py-2 text-lg text-gray-700"
                              )}
                            >
                              <DocumentPlusIcon className='w-5 h-5' />
                              Nueva Receta
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to={NavigationRoutes.Favorites}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "flex flex-row items-center gap-1 px-4 py-2 text-lg text-gray-700"
                              )}
                            >
                              <BookmarkIcon className='w-5 h-5' />
                              Mis Favoritos
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              type='button'
                              onClick={(e) => handleClickEndSesion(e)}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "flex flex-row items-center gap-1 w-full px-4 py-2 text-lg text-left text-gray-700"
                              )}
                            >
                              <ArrowRightOnRectangleIcon className='w-5 h-5' />
                              Cerrar sesión
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                ) : (
                  <button
                    type='button'
                    onClick={(e) => handleClickSignIn(e)}
                    className='flex flex-row gap-2 items-center relative rounded-xl py-2 px-3 hover:scale-110 duration-500 bg-orange-400 text-gray-900 hover:text-black font-semibold shadow-black/50 hover:shadow-md'
                  >
                    <span className='absolute -inset-1.5' />
                    <span className='sr-only'>Iniciar sesión</span>
                    <FontAwesomeIcon icon={"fa-solid fa-right-to-bracket"} />
                    <span className="hidden md:inline">Conectar</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  )
}

export default Header
