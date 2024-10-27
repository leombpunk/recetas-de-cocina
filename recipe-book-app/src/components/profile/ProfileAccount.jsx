import { useState, useEffect, useRef, Fragment } from "react"
import { Popover, Transition } from "@headlessui/react"
import { LinkIcon, TrashIcon } from "@heroicons/react/24/outline"
import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid"
import CustomModal from "../modals/CustomModal"

const ProfileAccount = ({
  profile,
  handleDeleteAccount,
  syncSocialAccount,
}) => {
  const [openModal, setOpenModal] = useState(false)
  const [confirm, setConfirm] = useState(false)
  const [cancel, setCancel] = useState(false)
  const deleteAll = useRef(null)

  useEffect(() => {
    if (confirm) {
      console.log(deleteAll.current.checked)
      // handleDeleteAccount(profile.usuario, deleteAll.current.checked)
      setConfirm(false)
    }
    if (cancel) {
      setCancel(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirm, cancel])

  return (
    <>
      <section className='border-b border-gray-900/10 pb-6'>
        <div className='px-4 pt-5 pb-7'>
          <h2 className='flex gap-1.5 items-center text-3xl font-medium'>
            <LinkIcon className='w-9 h-9' /> Vincular redes
          </h2>
          <div>
            <button>google</button>
          </div>
        </div>
      </section>
      <section className='border-b border-gray-900/10 pb-6'>
        <div className='px-4 pt-5 pb-7'>
          <h2 className='flex gap-1.5 items-center text-3xl font-medium'>
            <TrashIcon className='w-9 h-9' /> Eliminar cuenta
          </h2>
        </div>
        <div className='flex flex-row items-center justify-center w-full h-[7rem]'>
          <button
            type='button'
            onClick={() => setOpenModal(true)}
            className='bg-red-500 hover:bg-red-600 shadow-md hover:shadow-black/50 duration-300 py-5 px-8 rounded-xl text-2xl font-medium'
          >
            Eliminar cuenta
          </button>
        </div>
      </section>
      <CustomModal
        open={openModal}
        setOpen={setOpenModal}
        confirm={true}
        setConfirm={setConfirm}
        setCancel={setCancel}
      >
        <div className='pt-12 pb-8'>
          <p className='font-semibold text-2xl text-center'>
            ¿Deseas borrar tu cuenta? 😢
          </p>
          <div className='flex flex-row items-center justify-center gap-2 pt-6'>
            <input
              type='checkbox'
              id='deleteAll'
              name='deleteAll'
              ref={deleteAll}
              className="accent-orange-600"
            />
            <label htmlFor="deleteAll" className="italic">Deseas borrar también toda tu actividad</label>
            <Popover as="div">
              {({open}) => (
                <>
                  <Popover.Button>
                    <QuestionMarkCircleIcon
                      className={`h-6 w-6 text-orange-600`}
                      aria-hidden="true"
                    />
                  </Popover.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-72 -translate-x-1/2 transform px-2">
                      <div className="overflow-hidden rounded-lg shadow-md shadow-black/50 border border-orange-500 bg-orange-300 ring-1 ring-black/5">
                        <div className="p-2 text-center">
                          Recetas, comentarios y likes
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
                )
              }
            </Popover>

            {/* <span className='group'>
              <QuestionMarkCircleIcon className='h-6 w-6 text-orange-600' />
              <span className='absolute bottom-20 left-1/2 shadow-md shadow-black/50 opacity-0 group-hover:opacity-100 group-focus:opacity-100 border border-orange-500 rounded-xl p-2 bg-orange-300 duration-300'>
                Recetas, comentarios y likes
              </span>
            </span> */}
          </div>
        </div>
      </CustomModal>
    </>
  )
}

export default ProfileAccount
