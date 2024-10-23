const ProfileMainData = ({ profile }) => {
  return (
    <>
      <form id='dataForm'>
        <div className='grid grid-cols-12 w-full my-3'>
          <label className='text-lg font-semibold col-span-3' htmlFor='name'>
            Nombre
          </label>
          <input
            className='rounded-lg w-full col-span-9'
            type='text'
            id='name'
            name='name'
            placeholder='Tu nombre'
          />
        </div>
        <div className='grid grid-cols-12 w-full my-3'>
          <label className='text-lg font-semibold col-span-3' htmlFor='surname'>
            Apellido
          </label>
          <input
            className='rounded-lg w-full col-span-9'
            type='text'
            id='surname'
            name='surname'
            placeholder='Tu apellido'
          />
        </div>
        <div className='grid grid-cols-12 w-full my-3'>
          <label
            className='text-lg font-semibold col-span-3 w-32'
            htmlFor='nationality'
          >
            E-mail
          </label>
          <input
            className='rounded-lg w-full col-span-9'
            type='text'
            id='nationality'
            name='nationality'
            placeholder='Nacionalidad'
          />
        </div>
        <div className='flex flex-row justify-end gap-4 w-full my-3'>
          <button
            type='submit'
            className='text-lg font-semibold w-28 px-4 py-2 rounded-md bg-green-500'
          >
            Actualizar
          </button>
          <button
            type='button'
            className='text-lg font-semibold w-28 px-4 py-2 rounded-md bg-red-600'
          >
            Cancelar
          </button>
        </div>
      </form>
    </>
  )
}

export default ProfileMainData
