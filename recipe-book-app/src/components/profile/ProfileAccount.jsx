import { useState, useEffect, useRef, Fragment } from "react"
import { Popover, Transition } from "@headlessui/react"
import { LinkIcon, TrashIcon } from "@heroicons/react/24/outline"
import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid"
import CustomModal from "../modals/CustomModal"
import { RoutesAPI } from "../../utils/RoutesAPI"
import { useSearchParams } from "react-router-dom"

const ProfileAccount = ({
  profile,
  handleDeleteAccount,
  syncSocialAccount,
}) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [openModal, setOpenModal] = useState(false)
  const [confirm, setConfirm] = useState(false)
  const [cancel, setCancel] = useState(false)
  const deleteAll = useRef(null)
  const [openModalUnlink, setOpenModalUnlink] = useState(false)
  const [confirmUnlink, setConfirmUnlink] = useState(false)
  const [cancelUnlink, setCancelUnlink] = useState(false)

  useEffect(() => {
    if (confirm) {
      console.log(deleteAll.current.checked)
      handleDeleteAccount(profile.usuario, deleteAll.current.checked)
      setConfirm(false)
    }
    if (cancel) {
      setCancel(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirm, cancel])

  useEffect(() => {
    if (confirmUnlink) {
      syncSocialAccount.unlink(profile.googleId)
      setConfirmUnlink(false)
    }
    if (cancelUnlink) {
      setCancelUnlink(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirmUnlink, cancelUnlink])

  useEffect(() => {
    if (searchParams.get("googleId")) {
      console.log(searchParams.get("googleId"))
      // llamar al servicio para enviar el googleId al backend
      // y que lo asocie al usuario logeado a traves del token
      // deshabilitar el boton de vincular mientras se realiza
      // la operación,
      // luego si todo sale bien borrar el searchParams
      // y notificar lo sucedido
      syncSocialAccount.link(searchParams.get("googleId"))
    }
    return () => searchParams.delete("googleId") 
  }, [searchParams])

  const handleLinkGoogle = (event) => {
    event.preventDefault()
    window.location.href = `${RoutesAPI.profile}/perfil/google`
  }

  const handleUnlink = (event) => {
    event.preventDefault()
    //al desvincular mostrar un modal de confirmacion
    setOpenModalUnlink(true)
  }

  return (
    <>
      <section className='border-b border-gray-900/10 pb-6'>
        <div className='px-4 pt-5 pb-7'>
          <h2 className='flex gap-1.5 items-center text-3xl font-medium'>
            <LinkIcon className='w-9 h-9' /> Vincular redes
          </h2>
          <div className='m-auto mt-6 max-w-xs px-1'>
            <button
              onClick={(e) =>
                profile.googleId ? handleUnlink(e) : handleLinkGoogle(e)
              }
              type='button'
              aria-label='Continue with google'
              className='focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border rounded-xl border-gray-500 bg-gray-200 flex items-center w-full shadow-md'
            >
              <svg
                width={19}
                height={20}
                viewBox='0 0 19 20'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M18.9892 10.1871C18.9892 9.36767 18.9246 8.76973 18.7847 8.14966H9.68848V11.848H15.0277C14.9201 12.767 14.3388 14.1512 13.047 15.0812L13.0289 15.205L15.905 17.4969L16.1042 17.5173C17.9342 15.7789 18.9892 13.221 18.9892 10.1871Z'
                  fill='#4285F4'
                />
                <path
                  d='M9.68813 19.9314C12.3039 19.9314 14.4999 19.0455 16.1039 17.5174L13.0467 15.0813C12.2286 15.6682 11.1306 16.0779 9.68813 16.0779C7.12612 16.0779 4.95165 14.3395 4.17651 11.9366L4.06289 11.9465L1.07231 14.3273L1.0332 14.4391C2.62638 17.6946 5.89889 19.9314 9.68813 19.9314Z'
                  fill='#34A853'
                />
                <path
                  d='M4.17667 11.9366C3.97215 11.3165 3.85378 10.6521 3.85378 9.96562C3.85378 9.27905 3.97215 8.6147 4.16591 7.99463L4.1605 7.86257L1.13246 5.44363L1.03339 5.49211C0.37677 6.84302 0 8.36005 0 9.96562C0 11.5712 0.37677 13.0881 1.03339 14.4391L4.17667 11.9366Z'
                  fill='#FBBC05'
                />
                <path
                  d='M9.68807 3.85336C11.5073 3.85336 12.7344 4.66168 13.4342 5.33718L16.1684 2.59107C14.4892 0.985496 12.3039 0 9.68807 0C5.89885 0 2.62637 2.23672 1.0332 5.49214L4.16573 7.99466C4.95162 5.59183 7.12608 3.85336 9.68807 3.85336Z'
                  fill='#EB4335'
                />
              </svg>
              <p className='text-lg font-medium ml-4 text-gray-900'>
                {profile.googleId ? "Desvincular" : "Vincular"} cuenta de Google
              </p>
            </button>
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
              className='accent-orange-600'
            />
            <label htmlFor='deleteAll' className='italic'>
              Deseas borrar también toda tu actividad
            </label>
            <Popover as='div'>
              {({ open }) => (
                <>
                  <Popover.Button>
                    <QuestionMarkCircleIcon
                      className={`h-6 w-6 text-orange-600`}
                      aria-hidden='true'
                    />
                  </Popover.Button>
                  <Transition
                    as={Fragment}
                    enter='transition ease-out duration-200'
                    enterFrom='opacity-0 translate-y-1'
                    enterTo='opacity-100 translate-y-0'
                    leave='transition ease-in duration-150'
                    leaveFrom='opacity-100 translate-y-0'
                    leaveTo='opacity-0 translate-y-1'
                  >
                    <Popover.Panel className='absolute left-1/2 z-10 mt-3 w-72 -translate-x-1/2 transform px-2'>
                      <div className='overflow-hidden rounded-lg shadow-md shadow-black/50 border border-orange-500 bg-orange-300 ring-1 ring-black/5'>
                        <div className='p-2 text-center'>
                          Recetas, comentarios y likes
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
          </div>
        </div>
      </CustomModal>
      {/*confirmacion de desvinculacion de cuenta de google*/}
      <CustomModal
        open={openModalUnlink}
        setOpen={setOpenModalUnlink}
        confirm={true}
        setConfirm={setConfirmUnlink}
        setCancel={setCancelUnlink}
      >
        <div className='pt-12 pb-8'>
          <p className='font-semibold text-2xl text-center'>
            ¿Deseas desvincular tu cuenta de Google?
          </p>
        </div>
      </CustomModal>
    </>
  )
}

export default ProfileAccount
