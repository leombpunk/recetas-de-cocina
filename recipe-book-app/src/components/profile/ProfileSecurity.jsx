const ProfileSecurity = ({ profile }) => {
  return (
    <>
      <form>
        <div className='grid grid-cols-12 w-full my-3'>
          <label
            className='text-lg font-semibold col-span-3'
            htmlFor='username'
          >
            Usuario
          </label>
          <input
            className='rounded-lg w-full col-span-9'
            type='text'
            id='username'
            name='username'
            placeholder='Nombre de usuario'
          />
        </div>
        correo y cambio de contraseña
      </form>
    </>
  )
}

export default ProfileSecurity
