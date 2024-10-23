import { useForm } from "react-hook-form"
import {
  CheckIcon,
  ExclamationCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline"
import { yupResolver } from "@hookform/resolvers/yup"
import { profileSchema } from "../../utils/ProfileResolver"

const ProfileMainData = ({ profile, resources }) => {
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      names: profile.nombres,
      lastnames: profile.apellidos,
      email: profile.mail,
    },
    values: {
      names: profile.nombres,
      lastnames: profile.apellidos,
      email: profile.mail,
    },
    resolver: yupResolver(profileSchema),
  })
  const onSubmit = (data) => {
    console.log(data)
  }
  return (
    <>
      <form id='dataForm' className='px-6' onSubmit={handleSubmit(onSubmit)}>
        <div className='grid grid-cols-1 lg:grid-cols-12 items-center w-full my-3'>
          <label className='text-lg font-semibold col-span-2' htmlFor='name'>
            Nombres
          </label>
          <input
            className={`rounded-xl w-full col-span-10 ${errors.names && 'border border-red-500 focus:border-red-500 focus:ring-red-500'}`}
            type='text'
            id='names'
            name='names'
            placeholder='Tu nombre'
            {...register("names")}
          />
          {errors.names && (
            <span className='flex gap-0.5 mt-0.5 col-start-1 lg:col-start-3 col-span-10 italic text-red-500 text-sm'>
              <ExclamationCircleIcon className='w-5 h-5 inline' />
              {errors.names.message}
            </span>
          )}
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-12 items-center w-full my-3'>
          <label className='text-lg font-semibold col-span-2' htmlFor='surname'>
            Apellidos
          </label>
          <input
            className={`rounded-xl w-full col-span-10 ${errors.lastnames && 'border border-red-500 focus:border-red-500 focus:ring-red-500'}`}
            type='text'
            id='lastnames'
            name='lastnames'
            placeholder='Tu apellido'
            {...register("lastnames")}
          />
          {errors.lastnames && (
            <span className='flex gap-0.5 mt-0.5 col-start-1 lg:col-start-3 col-span-10 italic text-red-500 text-sm'>
              <ExclamationCircleIcon className='w-5 h-5 inline' />
              {errors.lastnames.message}
            </span>
          )}
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-12 items-center w-full my-3'>
          <label
            className='text-lg font-semibold col-span-2 w-32'
            htmlFor='nationality'
          >
            Email
          </label>
          <input
            className={`rounded-xl w-full col-span-10 ${errors.email && 'border border-red-500 focus:border-red-500 focus:ring-red-500'}`}
            type='email'
            id='email'
            name='email'
            placeholder='Ingresa tu email'
            {...register("email")}
          />
          {errors.email && (
            <span className='flex h-5 gap-0.5 mt-0.5 col-start-1 lg:col-start-3 col-span-10 italic text-red-500 text-sm'>
              <ExclamationCircleIcon className='w-5 h-5 inline' />
              {errors.email.message}
            </span>
          )}
        </div>
        <div className='flex flex-row justify-end gap-4 w-full my-3'>
          <button
            type='submit'
            className='flex flex-row gap-1 items-center text-lg font-medium w-36 px-4 py-2 rounded-xl border border-orange-500 bg-orange-400 shadow-md hover:shadow-black/50 duration-300'
          >
            <CheckIcon className='w-8 h-8 text-gray-900' />
            Actualizar
          </button>
          <button
            type='button'
            className='flex flex-row gap-1 items-center text-lg font-medium w-36 px-4 py-2 rounded-xl bg-gray-300 hover:bg-red-500 shadow-md hover:shadow-black/50 duration-300'
            onClick={() => reset()}
          >
            <XMarkIcon className='w-8 h-8 text-gray-900' />
            Cancelar
          </button>
        </div>
      </form>
    </>
  )
}

export default ProfileMainData
