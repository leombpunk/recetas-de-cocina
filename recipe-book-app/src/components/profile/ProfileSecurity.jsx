import {
  CheckIcon,
  LockClosedIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline"
import { useForm } from "react-hook-form"

const ProfileSecurity = ({ profile, handleUpdatePassword }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      oldPassword:"",
      newPassword:""
    },
  })

  const onSubmit = (data) => {
    
  }

  return (
    <>
      <div className='px-4 pt-5 pb-7'>
        <h2 className='flex gap-1.5 items-center text-3xl font-medium'>
          <LockClosedIcon className='w-9 h-9' /> Cambio de contraseña
        </h2>
      </div>
      <form id='passwordForm' className='px-6'>
        <div className='grid grid-cols-12 items-center w-full my-4'>
          <label
            className='text-lg font-semibold col-span-3'
            htmlFor='username'
          >
            Contraseña actual
          </label>
          <input
            className='rounded-xl w-full col-span-8'
            type='password'
            id='username'
            name='username'
            placeholder='Ingresa tu contraseña actual'
          />
        </div>
        <div className='grid grid-cols-12 items-center w-full my-4'>
          <label
            className='text-lg font-semibold col-span-3'
            htmlFor='username'
          >
            Contraseña nueva
          </label>
          <input
            className='rounded-xl w-full col-span-8'
            type='password'
            id='username'
            name='username'
            placeholder='Ingresa tu nueva contraseña'
          />
        </div>
        <div className='flex flex-row items-center justify-end gap-2 w-full mt-8'>
          <button
            type='submit'
            className={`${
              !isDirty
                ? "hover:cursor-not-allowed bg-gray-200 text-gray-600"
                : "border-orange-500 bg-orange-400 shadow-md hover:shadow-black/50"
            } flex flex-row gap-1 items-center border text-lg font-medium w-36 px-4 py-2 rounded-xl duration-300`}
            disabled={!isDirty}
          >
            <CheckIcon
              className={`${
                !isDirty ? "text-gray-600" : "text-gray-900"
              } w-8 h-8 `}
            />
            Actualizar
          </button>
          <button
            type='button'
            className={`${
              !isDirty
                ? "hover:cursor-not-allowed bg-gray-200 text-gray-600"
                : "bg-gray-300 shadow-md hover:shadow-black/50 hover:bg-red-500 hover:border-red-600"
            } flex flex-row gap-1 items-center border text-lg font-medium w-36 px-4 py-2 rounded-xl duration-300`}
            onClick={() => reset()}
            disabled={!isDirty}
          >
            <XMarkIcon
              className={`${
                !isDirty ? "text-gray-600" : "text-gray-900"
              } w-8 h-8 `}
            />
            Cancelar
          </button>
        </div>
      </form>
    </>
  )
}

export default ProfileSecurity
