// import { useEffect, useState } from "react"
import { Fragment } from "react"
import { Tab } from "@headlessui/react"
import { UserCircleIcon } from "@heroicons/react/24/outline"
import { useContextUser } from "../providers/UserProvider"
import useProfile from "../hooks/useProfile"
import { RoutesAPI } from "../utils/RoutesAPI"

const tabs = ["Personal", "Seguridad", "Cuenta"]

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

const ProfilePage = () => {
  const { user } = useContextUser()
  const { profile } = useProfile(user?.usuario)

  console.log(profile)
  return (
    <>
      <section className='bg-orange-300'>
        <div className='mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-18 md:px-2 md:max-w-3xl lg:max-w-7xl lg:px-8'>
          <div className='space-y-12'>
            <div className='border-b border-gray-900/10 pb-12'>
              <h2 className='text-2xl font-semibold leading-7 text-gray-900'>
                Configuracion de cuenta
              </h2>
              <p className='mt-1 text-base leading-6 text-gray-600'>
                Esta información será mostrada públicamente, tenga cuidado con
                lo que comparte.
              </p>
              <Tab.Group>
                <div className='flex flex-row items-start divide-x-2 mt-5'>
                  <Tab.List className='flex flex-row md:flex-col min-w-[15vw]'>
                    {tabs.map((tab, index) => (
                      <Fragment key={index}>
                        <Tab
                          key={index}
                          className={({ selected }) =>
                            classNames(
                              "text-lg font-semibold col-span-3 text-left rounded-xl duration-500 px-5 py-2 hover:shadow-md hover:bg-orange-500",
                              selected ? "bg-orange-600" : ""
                            )
                          }
                        >
                          {tab}
                        </Tab>
                        <hr />
                      </Fragment>
                    ))}
                  </Tab.List>
                  <Tab.Panels className='flex flex-row md:flex-col w-full min-h-[75vh] rounded-xl bg-orange-200 overflow-y-auto shadow-black/20 shadow-md'>
                    <Tab.Panel className='w-full px-5 pt-4'>
                      <div className='divide-y-2'>
                        <div className='mb-3'>
                          <h2 className="text-2xl font-mono">Hola 🤓 <span className="font-bold">{profile.usuario}</span>!</h2>
                          <form id='avatarForm' className="mt-3">
                            <label className='text-lg font-semibold col-span-3'>
                              Avatar
                            </label>
                            <picture>
                              {profile.imagen ? (
                                <img
                                  src={`${RoutesAPI.staticFiles}/avatars/${profile.imagen}`}
                                  alt='soy tu imagen de perfil'
                                />
                              ) : (
                                <UserCircleIcon className='w-24 h-24 text-gray-900' />
                              )}
                            </picture>
                            <input hidden />
                          </form>
                        </div>
                        <div className='pt-4'>
                          <form id='dataForm'>
                            <div className='grid grid-cols-12 w-full my-3'>
                              <label
                                className='text-lg font-semibold col-span-3'
                                htmlFor='username'
                              >
                                Usuario
                              </label>
                              <input
                                className='rounded-lg w-full col-span-9'
                                type='text'
                                id='username'
                                name='username'
                                placeholder='Nombre de usuario'
                              />
                            </div>
                            <div className='grid grid-cols-12 w-full my-3'>
                              <label
                                className='text-lg font-semibold col-span-3'
                                htmlFor='name'
                              >
                                Nombre
                              </label>
                              <input
                                className='rounded-lg w-full col-span-9'
                                type='text'
                                id='name'
                                name='name'
                                placeholder='Tu nombre'
                              />
                            </div>
                            <div className='grid grid-cols-12 w-full my-3'>
                              <label
                                className='text-lg font-semibold col-span-3'
                                htmlFor='surname'
                              >
                                Apellido
                              </label>
                              <input
                                className='rounded-lg w-full col-span-9'
                                type='text'
                                id='surname'
                                name='surname'
                                placeholder='Tu apellido'
                              />
                            </div>
                            <div className='grid grid-cols-12 w-full my-3'>
                              <label
                                className='text-lg font-semibold col-span-3 w-32'
                                htmlFor='nationality'
                              >
                                Nacionalidad
                              </label>
                              <input
                                className='rounded-lg w-full col-span-9'
                                type='text'
                                id='nationality'
                                name='nationality'
                                placeholder='Nacionalidad'
                              />
                            </div>
                            <div className='grid grid-cols-12 w-full my-3'>
                              <label
                                className='text-lg font-semibold col-span-3'
                                htmlFor='sex'
                              >
                                Sexo
                              </label>
                              <input
                                className='rounded-lg w-full col-span-9'
                                type='text'
                                id='sex'
                                name='sex'
                                placeholder='No sos traba verdad?'
                              />
                            </div>
                            <div className='flex flex-row justify-end gap-4 w-full my-3'>
                              <button
                                type='submit'
                                className='text-lg font-semibold w-28 px-4 py-2 rounded-md bg-green-500'
                              >
                                Actualizar
                              </button>
                              <button
                                type='button'
                                className='text-lg font-semibold w-28 px-4 py-2 rounded-md bg-red-600'
                              >
                                Cancelar
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </Tab.Panel>
                    <Tab.Panel className='w-full pl-5 pt-4'>
                      correo y cambio de contraseña
                    </Tab.Panel>
                    <Tab.Panel className='w-full pl-5 pt-4'>
                      vincular/desvincular cuenta de google
                    </Tab.Panel>
                  </Tab.Panels>
                </div>
              </Tab.Group>

              <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-5'>
                <div className='col-span-full'>
                  <label
                    htmlFor='photo'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Fotografia/Avatar
                  </label>
                  <div className='mt-2 flex items-center gap-x-3'>
                    <UserCircleIcon
                      className='h-16 w-16 text-gray-500'
                      aria-hidden='true'
                    />
                    <button
                      type='button'
                      className='rounded-md bg-orange-500 px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-md ring-1 ring-inset ring-orange-300 hover:bg-orange-400'
                    >
                      Cambiar
                    </button>
                  </div>
                  <input
                    id='photo'
                    name='photo'
                    className='invisible'
                    type='file'
                  />
                </div>

                <div className='sm:col-span-3'>
                  <label
                    htmlFor='username'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Usuario
                  </label>
                  <div className='mt-2'>
                    <input
                      type='text'
                      name='username'
                      id='username'
                      autoComplete='given-name'
                      className='block w-full bg-orange-100 rounded-md border-0 py-1.5 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6'
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className='border-b border-gray-900/10 pb-12'>
              <h2 className='text-base font-semibold leading-7 text-gray-900'>
                Información personal
              </h2>
              <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-5'>
                <div className='sm:col-span-3'>
                  <label
                    htmlFor='first-name'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Nombre
                  </label>
                  <div className='mt-2'>
                    <input
                      type='text'
                      name='first-name'
                      id='first-name'
                      autoComplete='given-name'
                      className='block w-full bg-orange-100 rounded-md border-0 py-1.5 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6'
                    />
                  </div>
                </div>

                <div className='sm:col-span-3'>
                  <label
                    htmlFor='last-name'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Apellido
                  </label>
                  <div className='mt-2'>
                    <input
                      type='text'
                      name='last-name'
                      id='last-name'
                      autoComplete='family-name'
                      className='block w-full bg-orange-100 rounded-md border-0 py-1.5 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6'
                    />
                  </div>
                </div>

                <div className='sm:col-span-3'>
                  <label
                    htmlFor='email'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Correo electrónico
                  </label>
                  <div className='mt-2'>
                    <input
                      id='email'
                      name='email'
                      type='email'
                      autoComplete='email'
                      className='block w-full bg-orange-100 rounded-md border-0 py-1.5 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6'
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className='border-b border-gray-900/10 pb-12'>
              <h2 className='text-base font-semibold leading-7 text-gray-900'>
                Notifications
              </h2>
              <p className='mt-1 text-sm leading-6 text-gray-600'>
                We'll always let you know about important changes, but you pick
                what else you want to hear about.
              </p>

              <div className='mt-10 space-y-10'>
                <fieldset>
                  <legend className='text-sm font-semibold leading-6 text-gray-900'>
                    By Email
                  </legend>
                  <div className='mt-6 space-y-6'>
                    <div className='relative flex gap-x-3'>
                      <div className='flex h-6 items-center'>
                        <input
                          id='comments'
                          name='comments'
                          type='checkbox'
                          className='h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-600'
                        />
                      </div>
                      <div className='text-sm leading-6'>
                        <label
                          htmlFor='comments'
                          className='font-medium text-gray-900'
                        >
                          Comments
                        </label>
                        <p className='text-gray-500'>
                          Get notified when someones posts a comment on a
                          posting.
                        </p>
                      </div>
                    </div>

                    <div className='relative flex gap-x-3'>
                      <div className='flex h-6 items-center'>
                        <input
                          id='offers'
                          name='offers'
                          type='checkbox'
                          className='h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-600'
                        />
                      </div>
                      <div className='text-sm leading-6'>
                        <label
                          htmlFor='offers'
                          className='font-medium text-gray-900'
                        >
                          Offers
                        </label>
                        <p className='text-gray-500'>
                          Get notified when a candidate accepts or rejects an
                          offer.
                        </p>
                      </div>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </div>

          <div className='mt-6 flex items-center justify-end gap-x-6'>
            <button
              type='button'
              className='text-sm font-semibold leading-6 text-gray-900'
            >
              Cancelar
            </button>
            <button
              type='submit'
              className='rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-black shadow-md hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600'
            >
              Guardar
            </button>
          </div>
        </div>
      </section>
    </>
  )
}

export default ProfilePage
