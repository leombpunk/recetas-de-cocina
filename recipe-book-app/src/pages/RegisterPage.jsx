import { Link } from "react-router-dom"
import bgImage from "../assets/images/vectorstock_49097965.png"
import NavigationRoutes from "../utils/NavigationRoutes"

const RegisterPage = () => {
  return (
    <>
      <div className='bg-gradient-to-tl from-orange-300 to-orange-700'>
        <div className='flex justify-center h-screen'>
          <div
            className='hidden bg-cover lg:block lg:w-2/3'
            style={{
              backgroundImage: `url(${bgImage})`,
            }}
          >
            <div className='flex items-center h-full px-20 bg-gray-900 bg-opacity-40'>
              <div className='flex items-center justify-center bg-white/80 rounded-full w-64 h-64'>
                <picture>
                  <img
                    className='focus:outline-none'
                    src={require("../assets/images/logo-y-nombre.png")}
                    alt='logo'
                    style={{ width: "250px", height: "165px" }}
                  />
                </picture>
              </div>
            </div>
          </div>

          <div className='flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6'>
            <div className='flex-1'>
              <div className='flex flex-col items-center justify-center text-center'>
                <picture>
                  <img
                    className='focus:outline-none'
                    src={require("../assets/images/logo-y-nombre.png")}
                    alt='logo'
                    style={{ width: "250px", height: "165px" }}
                  />
                </picture>

                <p className='text-xl mt-3 text-gray-200'>
                  Registrate y comparte tus recetas con otros usuarios
                </p>
              </div>

              <div className='mt-8'>
                <form autoComplete="off">
                  <div>
                    <label
                      for='name'
                      className='block mb-2 text-lg text-gray-200'
                    >
                      Nombre
                    </label>
                    <input
                      type='text'
                      name='name'
                      id='name'
                      placeholder='Nombre'
                      className='block w-full px-4 py-2 mt-2 text-gray-800 bg-white border border-gray-200 rounded-md'
                    />
                  </div>
                  <div className='mt-2'>
                    <label
                      for='surname'
                      className='block mb-2 text-lg text-gray-200'
                    >
                      Apellido
                    </label>
                    <input
                      type='text'
                      name='surname'
                      id='surname'
                      placeholder='Apellido'
                      className='block w-full px-4 py-2 mt-2 text-gray-800 bg-white border border-gray-200 rounded-md'
                    />
                  </div>
                  <div className='mt-2'>
                    <label
                      for='email'
                      className='block mb-2 text-lg text-gray-200'
                    >
                      Correo electrónico
                    </label>
                    <input
                      type='email'
                      name='email'
                      id='email'
                      placeholder='correo@dominio.com'
                      autoComplete="off"
                      className='block w-full px-4 py-2 mt-2 text-gray-800 bg-white border border-gray-200 rounded-md'
                    />
                  </div>

                  <div className='mt-2'>
                    <label
                      for='password'
                      className='text-lg text-gray-600 dark:text-gray-200'
                    >
                      Contraseña
                    </label>
                    <input
                      type='password'
                      name='password'
                      id='password'
                      placeholder='Contraseña'
                      autoComplete="off"
                      className='block w-full px-4 py-2 mt-2 text-gray-800 bg-white border border-gray-200 rounded-md'
                    />
                  </div>

                  <div className='mt-6'>
                    <button className='w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50'>
                      Registrarse
                    </button>
                  </div>
                </form>

                <p className='mt-4 text-lg text-center font-semibold text-gray-900'>
                  Ya tienes cuenta?{" "}
                  <Link
                    to={NavigationRoutes.Login}
                    className='text-blue-500 focus:outline-none focus:underline hover:underline'
                  >
                    Inicia Sesión
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default RegisterPage
