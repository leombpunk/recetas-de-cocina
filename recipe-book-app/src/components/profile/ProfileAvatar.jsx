import { useEffect, useRef, useState } from "react"
import {
  PhotoIcon,
  TrashIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline"
import { RoutesAPI } from "../../utils/RoutesAPI"
import CustomModal from '../modals/CustomModal'

const ProfileAvatar = ({ profile, resources }) => {
  const [openModal, setOpenModal] = useState(false)
  const [confirm, setConfirm] = useState(false)
  const [cancel, setCancel] = useState(false)
  const inputFile = useRef(null)

  const handleClickChange = () => {
    inputFile.current.click()
  }

  const handleChangeInput = (event) => {
    console.log(event.target.files[0])
    let file = event.target.files[0]
    resources.uploadPhoto(profile.usuario, file)
  }

  const handleClickDelete = (event) => {
    setOpenModal(true)
  }

  useEffect(() => {
    if (confirm) {
      resources.deletePhoto(profile.usuario)
      setConfirm(false)
    }
    if (cancel) {
      setCancel(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirm, cancel])

  return (
    <>
      <form id='avatarForm' className='mt-3 flex flex-col gap-2'>
        <div className='flex flex-row gap-4 items-start'>
          <div className='flex flex-col justify-center items-center gap-3'>
            <picture>
              {profile.imagen ? (
                <img
                  src={`${RoutesAPI.avatarFiles}/${profile.imagen}`}
                  alt='soy tu imagen de perfil'
                  className='w-36 h-36 bg-gray-200 rounded-full border border-gray-500 shadow-md shadow-black/50'
                />
              ) : (
                <UserCircleIcon className='w-28 h-28 text-gray-800 bg-gray-200 rounded-full border border-gray-500 shadow-md shadow-black/50' />
              )}
            </picture>
            <div className='flex flex-col gap-2 justify-center'>
              <button
                type='button'
                className='flex flex-row gap-1.5 bg-orange-400 font-medium rounded-xl py-1.5 px-2.5 border border-orange-500 shadow-md hover:shadow-black/50 duration-300'
                onClick={() => handleClickChange()}
              >
                <PhotoIcon
                  className='w-6 h-6 text-gray-900'
                  title='Cambiar avatar'
                />
                Cambiar
              </button>

              <button
                type='button'
                className={`${profile.imagen ? 'hover:bg-red-500 hover:shadow-black/50':'hover:cursor-not-allowed'} flex flex-row gap-1.5 font-medium bg-gray-300 rounded-xl py-1.5 px-2.5 shadow-md duration-300`}
                disabled={!(profile.imagen && true)}
                onClick={(e) => handleClickDelete(e)}
              >
                <TrashIcon
                  className='w-6 h-6 text-gray-900'
                  title='Borrar avatar'
                />
                Borrar
              </button>
            </div>
          </div>
          <h2 className='text-3xl font-medium mt-2'>
            Hola <span className='font-bold'>{profile.usuario}</span>! 🤓
          </h2>
        </div>
        <input
          id='inputFile'
          name='inputFile'
          type='file'
          multiple={false}
          ref={inputFile}
          accept='image/jpeg, image/png, image/webp'
          onChange={(e) => {
            handleChangeInput(e)
          }}
          hidden
        />
      </form>
      <CustomModal
        open={openModal}
        setOpen={setOpenModal}
        confirm={true}
        setConfirm={setConfirm}
        setCancel={setCancel}
      >
        <div className='pt-12 pb-6'>
          <p className='font-semibold text-2xl text-center'>
            ¿Deseas borrar tu imagen de perfil?
          </p>
        </div>
      </CustomModal>
    </>
  )
}

export default ProfileAvatar
