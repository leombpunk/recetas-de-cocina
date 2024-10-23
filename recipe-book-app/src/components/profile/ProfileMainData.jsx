import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline"

const ProfileMainData = ({ profile }) => {
  return (
    <>
      <form id='dataForm' className="px-6">
        <div className='grid grid-cols-12 w-full my-3'>
          <label className='text-lg font-semibold col-span-2' htmlFor='name'>
            Nombre
          </label>
          <input
            className='rounded-lg w-full col-span-10'
            type='text'
            id='name'
            name='name'
            placeholder='Tu nombre'
          />
        </div>
        <div className='grid grid-cols-12 w-full my-3'>
          <label className='text-lg font-semibold col-span-2' htmlFor='surname'>
            Apellido
          </label>
          <input
            className='rounded-lg w-full col-span-10'
            type='text'
            id='surname'
            name='surname'
            placeholder='Tu apellido'
          />
        </div>
        <div className='grid grid-cols-12 w-full my-3'>
          <label
            className='text-lg font-semibold col-span-2 w-32'
            htmlFor='nationality'
          >
            Email
          </label>
          <input
            className='rounded-lg w-full col-span-10'
            type='email'
            id='email'
            name='email'
            placeholder='Ingresa tu email'
          />
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
