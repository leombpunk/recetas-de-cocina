import { useForm } from "react-hook-form"
import {
  CheckIcon,
  ExclamationCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline"
import { yupResolver } from "@hookform/resolvers/yup"
import { profileSchema } from "../../utils/ProfileResolver"

const ProfileMainData = ({ profile, handleUpdate }) => {
  const {
    register,
    reset,
    formState: { errors, isDirty },
    handleSubmit,
  } = useForm({
    defaultValues: {
      nombres: profile.nombres,
      apellidos: profile.apellidos,
      mail: profile.mail,
    },
    values: {
      nombres: profile.nombres,
      apellidos: profile.apellidos,
      mail: profile.mail,
    },
    resolver: yupResolver(profileSchema),
  })
  const onSubmit = async (data) => {
    console.log(data)
    await handleUpdate(profile.usuario, data)
  }
  return (
    <>
      <form id='dataForm' className='px-6' onSubmit={handleSubmit(onSubmit)}>
        <div className='grid grid-cols-1 lg:grid-cols-12 items-center w-full my-3'>
          <label className='text-lg font-semibold col-span-2' htmlFor='nombres'>
            Nombres
          </label>
          <input
            className={`rounded-xl w-full col-span-10 ${errors.nombres && 'border border-red-500 focus:border-red-500 focus:ring-red-500'}`}
            type='text'
            id='nombres'
            name='nombres'
            placeholder='Tu nombre'
            {...register("nombres")}
          />
          {errors.nombres && (
            <span className='flex gap-0.5 mt-0.5 col-start-1 lg:col-start-3 col-span-10 italic text-red-500 text-sm'>
              <ExclamationCircleIcon className='w-5 h-5 inline' />
              {errors.nombres.message}
            </span>
          )}
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-12 items-center w-full my-3'>
          <label className='text-lg font-semibold col-span-2' htmlFor='apellidos'>
            Apellidos
          </label>
          <input
            className={`rounded-xl w-full col-span-10 ${errors.apellidos && 'border border-red-500 focus:border-red-500 focus:ring-red-500'}`}
            type='text'
            id='apellidos'
            name='apellidos'
            placeholder='Tu apellido'
            {...register("apellidos")}
          />
          {errors.apellidos && (
            <span className='flex gap-0.5 mt-0.5 col-start-1 lg:col-start-3 col-span-10 italic text-red-500 text-sm'>
              <ExclamationCircleIcon className='w-5 h-5 inline' />
              {errors.apellidos.message}
            </span>
          )}
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-12 items-center w-full my-3'>
          <label
            className='text-lg font-semibold col-span-2 w-32'
            htmlFor='mail'
          >
            Email
          </label>
          <input
            className={`rounded-xl w-full col-span-10 ${errors.mail && 'border border-red-500 focus:border-red-500 focus:ring-red-500'}`}
            type='email'
            id='mail'
            name='mail'
            placeholder='Ingresa tu email'
            {...register("mail")}
          />
          {errors.mail && (
            <span className='flex h-5 gap-0.5 mt-0.5 col-start-1 lg:col-start-3 col-span-10 italic text-red-500 text-sm'>
              <ExclamationCircleIcon className='w-5 h-5 inline' />
              {errors.mail.message}
            </span>
          )}
        </div>
        <div className='flex flex-row justify-end gap-4 w-full my-3'>
          <button
            type='submit'
            className={`${!isDirty ? 'hover:cursor-not-allowed bg-gray-200 text-gray-600':'border-orange-500 bg-orange-400 shadow-md hover:shadow-black/50'} flex flex-row gap-1 items-center border text-lg font-medium w-36 px-4 py-2 rounded-xl duration-300`}
            disabled={!isDirty}
          >
            <CheckIcon className={`${!isDirty ? 'text-gray-600':'text-gray-900'} w-8 h-8 `} />
            Actualizar
          </button>
          <button
            type='button'
            className={`${!isDirty ? 'hover:cursor-not-allowed bg-gray-200 text-gray-600':'bg-gray-300 shadow-md hover:shadow-black/50 hover:bg-red-500 hover:border-red-600'} flex flex-row gap-1 items-center border text-lg font-medium w-36 px-4 py-2 rounded-xl duration-300`}
            onClick={() => reset()}
            disabled={!isDirty}
          >
            <XMarkIcon className={`${!isDirty ? 'text-gray-600':'text-gray-900'} w-8 h-8 `} />
            Cancelar
          </button>
        </div>
      </form>
    </>
  )
}

export default ProfileMainData
