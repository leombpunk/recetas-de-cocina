import { useState } from "react"
import { useForm } from "react-hook-form"
import {
  CheckIcon,
  ExclamationCircleIcon,
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline"
import { yupResolver } from "@hookform/resolvers/yup"
import { passwordSchema } from "../../utils/ProfileResolver"
import { useContextNotification } from "../../providers/NotificationProvider"

const ProfileSecurity = ({ profile, handleUpdatePassword }) => {
  const [showOld, setShowOld] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const { addNotification } = useContextNotification()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, dirtyFields },
  } = useForm({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
    resolver: yupResolver(passwordSchema),
  })

  const onSubmit = (data) => {
    console.log(data)
    if (data.oldPassword === data.newPassword) {
      addNotification({
        message: "La nueva contraseña debe ser diferente a la actual",
        type: "error",
      })
    } else {
      handleUpdatePassword(data)
      // addNotification({ message: "tu vieja", type: "success" })
    }
  }

  return (
    <>
      <div className='px-4 pt-5 pb-7'>
        <h2 className='flex gap-1.5 items-center text-3xl font-medium'>
          <LockClosedIcon className='w-9 h-9' /> Cambio de contraseña
        </h2>
      </div>
      <form
        id='passwordForm'
        className='px-6'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='grid grid-cols-12 items-center gap-1 lg:gap-0 w-full my-4'>
          <label
            className='text-lg font-semibold col-span-12 lg:col-span-3'
            htmlFor='oldPassword'
          >
            Contraseña actual
          </label>
          <div className='relative w-full col-span-12 lg:col-span-8 rounded-xl'>
            <input
              id='oldPassword'
              name='oldPassword'
              type={showOld ? "password" : "text"}
              min={8}
              max={16}
              maxLength={16}
              placeholder='Ingrese su actual contraseña'
              className={`rounded-xl w-full col-span-10 block pr-10 text-gray-900 ${errors.oldPassword && 'border border-red-500 focus:border-red-500 focus:ring-red-500'}`}
              {...register("oldPassword")}
            />
            <div className={`absolute inset-y-0 right-0 flex items-center pr-3`}>
              <button type='button' className={`${errors.oldPassword && 'hover:cursor-not-allowed text-gray-600'}`} onClick={() => setShowOld(!showOld)} disabled={errors.oldPassword}>
                {showOld ? (
                  <EyeIcon className='w-5 h-5' />
                ) : (
                  <EyeSlashIcon className='w-5 h-5' />
                )}{" "}
              </button>
            </div>
          </div>
          {errors.oldPassword && (
            <span className='flex h-5 gap-0.5 mt-0.5 col-start-1 lg:col-start-4 col-span-12 lg:col-span-8 italic text-red-500 text-sm'>
              <ExclamationCircleIcon className='w-5 h-5 inline' />
              {errors.oldPassword.message}
            </span>
          )}
        </div>
        <div className='grid grid-cols-12 items-center gap-1 lg:gap-0 w-full my-4'>
          <label
            className='text-lg font-semibold col-span-12 lg:col-span-3'
            htmlFor='newPassword'
          >
            Contraseña nueva
          </label>
          <div className='relative w-full col-span-12 lg:col-span-8 rounded-xl'>
            <input
              id='newPassword'
              name='newPassword'
              type={showNew ? "password" : "text"}
              min={8}
              max={16}
              maxLength={16}
              placeholder='Ingrese su nueva contraseña'
              className={`rounded-xl w-full col-span-10 block pr-10 text-gray-900 ${errors.newPassword && 'border border-red-500 focus:border-red-500 focus:ring-red-500'}`}
              {...register("newPassword")}
            />
            <div className={`absolute inset-y-0 right-0 flex items-center pr-3`}>
              <button type='button' className={`${errors.oldPassword && 'hover:cursor-not-allowed text-gray-600'}`} onClick={() => setShowNew(!showNew)}>
                {showNew ? (
                  <EyeIcon className='w-5 h-5' />
                ) : (
                  <EyeSlashIcon className='w-5 h-5' />
                )}{" "}
              </button>
            </div>
          </div>
          {errors.newPassword && (
            <span className='flex h-5 gap-0.5 mt-0.5 col-start-1 lg:col-start-4 col-span-12 lg:col-span-8 italic text-red-500 text-sm'>
              <ExclamationCircleIcon className='w-5 h-5 inline' />
              {errors.newPassword.message}
            </span>
          )}
        </div>
        <div className='flex flex-row items-center justify-end gap-2 w-full mt-8'>
          <button
            type='submit'
            className={`${
              !(dirtyFields.newPassword && dirtyFields.oldPassword)
                ? "hover:cursor-not-allowed bg-gray-200 text-gray-600"
                : "border-orange-500 bg-orange-400 shadow-md hover:shadow-black/50"
            } flex flex-row gap-1 items-center border text-lg font-medium w-36 px-4 py-2 rounded-xl duration-300`}
            disabled={!(dirtyFields.newPassword && dirtyFields.oldPassword)}
          >
            <CheckIcon
              className={`${
                !(dirtyFields.newPassword && dirtyFields.oldPassword)
                  ? "text-gray-600"
                  : "text-gray-900"
              } w-8 h-8 `}
            />
            Actualizar
          </button>
          <button
            type='button'
            className={`${
              !(dirtyFields.newPassword && dirtyFields.oldPassword)
                ? "hover:cursor-not-allowed bg-gray-200 text-gray-600"
                : "bg-gray-300 shadow-md hover:shadow-black/50 hover:bg-red-500 hover:border-red-600"
            } flex flex-row gap-1 items-center border text-lg font-medium w-36 px-4 py-2 rounded-xl duration-300`}
            onClick={() => reset()}
            disabled={!(dirtyFields.newPassword && dirtyFields.oldPassword)}
          >
            <XMarkIcon
              className={`${
                !(dirtyFields.newPassword && dirtyFields.oldPassword)
                  ? "text-gray-600"
                  : "text-gray-900"
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
