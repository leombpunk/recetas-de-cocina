import { Fragment, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { XMarkIcon } from "@heroicons/react/24/solid"

const CustomModal = ({ open = false, setOpen, confirm = false, children }) => {
  // const [isOpen, setIsOpen] = useState(open)
  const [isConfirm, setConfirm] = useState(confirm)

  function closeModal() {
    setOpen(false)
  }

  // function openModal() {
  //   setIsOpen(true)
  // }

  function confirmModal() {
    setConfirm(true)
    closeModal()
  }

  function cancelModal() {
    setConfirm(false)
    closeModal()
  }
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black/40' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel className='w-full max-w-lg transform overflow-hidden rounded-2xl bg-orange-200 p-6 text-left align-middle shadow-xl transition-all'>
                <div className='absolute pt-3 pr-5 top-0 right-0'>
                  <button
                    type='button'
                    className='p-1 rounded-xl hover:bg-red-500 hover:scale-105 shadow-black/50 hover:shadow-md duration-300'
                    title='Cerrar ventana'
                    onClick={closeModal}
                  >
                    <XMarkIcon className='h-7 w-7' />
                  </button>
                </div>
                {/* <h1
                  className='mt-10 text-3xl font-semibold leading-6 text-gray-900 text-center border-b-2 border-gray-400/50 pb-5'
                >
                  Aún no eres miembro! 😲
                </h1>
                <div className='mt-8 mb-6 flex flex-col items-center justify-center w-full gap-2'>
                  <h2 className='text-gray-800 text-center font-medium text-xl leading-6'>
                    Inicia Sesión
                  </h2>
                  <button className='bg-orange-400 hover:bg-orange-300 w-3/4 py-3 hover:scale-105 duration-300 font-semibold shadow-md hover:shadow-black/50 rounded-xl text-2xl'>
                    Ingresar
                  </button>
                  <div className='flex w-full mt-7 items-center text-center gap-4'>
                    <hr className='border-gray-400 border-1 w-full rounded-md' />
                    <p className='text-gray-500 italic text-center font-medium text-lg leading-6'>
                      O
                    </p>
                    <hr className='border-gray-400 border-1 w-full rounded-md' />
                  </div>

                  <h2 className='text-gray-800 text-center font-medium text-xl leading-6'>
                    Registrate
                  </h2>
                  <p className='text-gray-500 italic text-center font-medium text-lg leading-6'>
                    (es gratis)
                  </p>
                  <button className='bg-orange-400 hover:bg-orange-300 w-3/4 py-3 hover:scale-105 duration-300 font-semibold shadow-md hover:shadow-black/50 rounded-xl text-2xl'>
                    Registro
                  </button>
                </div> */}
                {children}

                {isConfirm ? (
                  <div className='mt-4 flex flex-row items-center justify-end border-t-2 border-gray-400/50 py-3 gap-4'>
                    <button
                      type='button'
                      className='hover:bg-red-600 py-2 px-6 font-semibold text-lg hover:scale-105 duration-300 rounded-xl'
                      onClick={cancelModal}
                    >
                      Cancelar
                    </button>
                    <button
                      type='button'
                      className='bg-green-600 hover:bg-green-500 py-2 px-6 font-semibold text-lg shadow-md hover:shadow-black/50 hover:scale-105 duration-300 rounded-xl'
                      onClick={confirmModal}
                    >
                      Confirmar
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default CustomModal
