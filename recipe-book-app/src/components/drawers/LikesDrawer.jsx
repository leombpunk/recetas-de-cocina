import { Fragment } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { UserCircleIcon, XMarkIcon } from "@heroicons/react/24/outline"
import Loader from "../loader/Loader"
// import { RoutesAPI } from "../../utils/RoutesAPI"

const LikesDrawer = ({ open, setOpen, loading, likes }) => {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter='ease-in-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in-out duration-300'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-gray-700 bg-opacity-75 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-hidden'>
          <div className='absolute inset-0 overflow-hidden'>
            <div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10'>
              <Transition.Child
                as={Fragment}
                enter='transform transition ease-in-out duration-500 sm:duration-700'
                enterFrom='translate-x-full'
                enterTo='translate-x-0'
                leave='transform transition ease-in-out duration-500 sm:duration-700'
                leaveFrom='translate-x-0'
                leaveTo='translate-x-full'
              >
                <Dialog.Panel className='pointer-events-auto relative w-screen max-w-2xl'>
                  <Transition.Child
                    as={Fragment}
                    enter='ease-in-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in-out duration-300'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                  >
                    <div className='absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4'>
                      <button
                        type='button'
                        className='relative rounded-md bg-orange-400 text-gray-900 hover:text-black focus-visible:ring-0'
                        onClick={() => setOpen(false)}
                      >
                        <span className='absolute -inset-2.5' />
                        <span className='sr-only'>Cerrar panel</span>
                        <XMarkIcon className='h-7 w-7' aria-hidden='true' />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className='flex h-full flex-col overflow-y-scroll bg-orange-400 border-l-2 border-orange-300 py-6 shadow-xl'>
                    <div className='flex flex-row flex-wrap gap-2 px-4 sm:px-6'>
                      <Dialog.Title className='text-3xl font-semibold leading-6 text-black text-balance'>
                        Lista de usuarios que dejaron un "me gusta"
                      </Dialog.Title>
                    </div>
                    <div className='flex flex-col gap-2 py-10 px-4 sm:px-6'>
                      {loading ? (
                        <Loader />
                      ) : (
                        <>
                          <ul className="">
                            {likes.length ? (
                              likes.map((like) => (
                                <li className='flex flex-row items-center gap-4 text-xl font-medium w-full border-2 border-orange-600 rounded-xl px-2 py-1 shadow-md shadow-black/50'>
                                  <picture>
                                    {like?.usuario?.urlPublica ? (
                                      <img
                                        className="h-10 w-10 rounded-full"
                                        src={`${like?.usuario?.urlPublica}`}
                                        alt='Avatar de usuario'
                                      />
                                    ) : <UserCircleIcon className='h-10 w-10 rounded-full text-gray-900 bg-gray-300' />}
                                  </picture>
                                  <div className="flex flex-col justify-center gap-0.5">
                                    <p className="text-gray-900">{like.usuario.usuario}</p>
                                    <p className="text-base italic text-gray-800/70">{like.createAt}</p>
                                  </div>
                                </li>
                              ))
                            ) : (
                              <li className='flex flex-row items-center gap-4 text-xl font-medium w-full border-2 border-orange-600 rounded-xl px-2 py-1 shadow-md shadow-black/50'>
                                Aún no hay ningún "me gusta"
                              </li>
                            )}
                          </ul>
                        </>
                      )}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default LikesDrawer
