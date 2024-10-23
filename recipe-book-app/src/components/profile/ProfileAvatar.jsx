import { useEffect, useRef } from "react"
import {
  PhotoIcon,
  TrashIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline"
import { RoutesAPI } from "../../utils/RoutesAPI"
import { useContextNotification } from "../../providers/NotificationProvider"

const validFileTypes = ["image/jpeg", "image/png", "image/webp"]

const ProfileAvatar = ({ profile, resources }) => {
  const { addNotification } = useContextNotification()
  const inputFile = useRef(null)

  const handleClickChange = () => {
    inputFile.current.click()
  }

  const handleChangeInput = (event) => {
    console.log(event.target.files[0])
    let file = event.target.files[0]
    //if (file.type.includes(validFileTypes)) {
    //mandar al server, e informar el resultado
    //console.log('ola k ase')
    resources.uploadPhoto(profile.usuario, file)
    //} else {
    //informar que el tipo de dato no es compatible o el esperado
    //console.log('xd')
    //}
  }

  useEffect(() => {
    addNotification(resources.notifyUpload)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resources.notifyUpload])

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
                  className='w-28 h-28 bg-gray-200 rounded-full border border-gray-500 shadow-md shadow-black/50'
                />
              ) : (
                <UserCircleIcon className='w-28 h-28 text-gray-800 bg-gray-200 rounded-full border border-gray-500 shadow-md shadow-black/50' />
              )}
            </picture>
            <div className='flex flex-col gap-2 justify-center'>
              <button
                type='button'
                className='flex flex-row gap-1.5 bg-orange-400 rounded-xl py-1.5 px-2.5 border border-orange-500 shadow-md hover:shadow-black/50 duration-300'
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
                className={`${profile.imagen ? 'hover:bg-red-500 hover:shadow-black/50':'hover:cursor-not-allowed'} flex flex-row gap-1.5 bg-gray-300 rounded-xl py-1.5 px-2.5 shadow-md duration-300`}
                disabled={!(profile.imagen && true)}
                onClick={(e) => null}
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
    </>
  )
}

export default ProfileAvatar
