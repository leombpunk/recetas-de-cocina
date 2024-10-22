import { useRef } from "react"
import {
  PhotoIcon,
  TrashIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline"
import { RoutesAPI } from "../../utils/RoutesAPI"

const ProfileAvatar = ({ profile }) => {
  const inputFile = useRef()

  const handleClickChange = () => {
    inputFile.current.click()
  }

  const handleChangeInput = (event) => {
    console.log(event)
  }

  return (
    <>
      <form id='avatarForm' className='mt-3 flex flex-col gap-2'>
        <div className='flex flex-row gap-4 items-start'>
          <div className='flex flex-col gap-3'>
            <picture>
              {profile.imagen ? (
                <img
                  src={`${RoutesAPI.staticFiles}/avatars/${profile.imagen}`}
                  alt='soy tu imagen de perfil'
                  className='rounded-full'
                />
              ) : (
                <UserCircleIcon className='w-28 h-28 text-gray-800 bg-gray-200 rounded-full border border-gray-500 shadow-md shadow-black/50' />
              )}
            </picture>
            <div className='flex flex-row gap-2 justify-center'>
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
              {profile.imagen && (
                <button type='button' className='bg-gray-300 rounded-xl'>
                  <TrashIcon
                    className='w-6 h-6 text-gray-900'
                    title='Borrar avatar'
                  />
                </button>
              )}
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
          ref={inputFile}
          accept="image/jpeg, image/png, image/webp"
          onChange={(e) => {handleChangeInput(e)}}
          hidden
        />
      </form>
    </>
  )
}

export default ProfileAvatar
