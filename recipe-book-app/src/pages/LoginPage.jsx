import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import useLogin from "../hooks/useLogin"
import loginSchema from "../utils/LoginResolver"
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import NavigationRoutes from "../utils/NavigationRoutes"
import { RoutesAPI } from "../utils/RoutesAPI"
import { setToken } from "../utils/Token"

const LoginPage = () => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [show, setShow] = useState(true)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: yupResolver(loginSchema),
  })
  const { loading, login } = useLogin()
  const onSubmit = (data) => {
    login({ user: data.username, pass: data.password })
  }

  const handleClickRegisterGoogle = (event) => {
    event.preventDefault()
    window.location.href = `${RoutesAPI.auth}/google`;
    // googleLogin()
  }

  useEffect(() => {
    if (searchParams.get("token")) {
      console.log(searchParams.get("token"))
      setToken(searchParams.get("token"))
      navigate(NavigationRoutes.Home)
    }
  }, [searchParams])

  return (
    <>
      <div className='bg-gradient-to-tl from-orange-300 to-orange-700 w-full py-16 px-4'>
        <div className='flex flex-col items-center justify-center'>
          <picture>
            <img
              className='focus:outline-none'
              src={require("../assets/images/logo-y-nombre.png")}
              alt='logo'
              style={{ width: "250px", height: "165px" }}
            />
          </picture>
          <div className='bg-white shadow rounded lg:w-[30rem] md:w-1/2 w-full p-10 mt-10'>
            <p
              tabIndex={0}
              className='focus:outline-none text-3xl font-extrabold leading-6 text-gray-800 text-center'
            >
              Inicio de Sesión
            </p>
            <p
              tabIndex={0}
              className='focus:outline-none text-lg mt-4 font-medium leading-none text-gray-500 text-center'
            >
              Aún no tienes una cuenta?{" "}
              <Link
                to={`${NavigationRoutes.Register}`}
                title='Registrate'
                aria-label='Registrate'
                className='hover:text-gray-500 focus:text-gray-500 focus:outline-none focus:underline hover:underline text-lg font-medium leading-none  text-gray-800 cursor-pointer'
              >
                Registrate aquí
              </Link>
            </p>
            <button
              onClick={(e) => handleClickRegisterGoogle(e)}
              type='button'
              aria-label='Continue with google'
              className='focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-gray-700 flex items-center w-full mt-10'
            >
              <svg
                width={19}
                height={20}
                viewBox='0 0 19 20'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M18.9892 10.1871C18.9892 9.36767 18.9246 8.76973 18.7847 8.14966H9.68848V11.848H15.0277C14.9201 12.767 14.3388 14.1512 13.047 15.0812L13.0289 15.205L15.905 17.4969L16.1042 17.5173C17.9342 15.7789 18.9892 13.221 18.9892 10.1871Z'
                  fill='#4285F4'
                />
                <path
                  d='M9.68813 19.9314C12.3039 19.9314 14.4999 19.0455 16.1039 17.5174L13.0467 15.0813C12.2286 15.6682 11.1306 16.0779 9.68813 16.0779C7.12612 16.0779 4.95165 14.3395 4.17651 11.9366L4.06289 11.9465L1.07231 14.3273L1.0332 14.4391C2.62638 17.6946 5.89889 19.9314 9.68813 19.9314Z'
                  fill='#34A853'
                />
                <path
                  d='M4.17667 11.9366C3.97215 11.3165 3.85378 10.6521 3.85378 9.96562C3.85378 9.27905 3.97215 8.6147 4.16591 7.99463L4.1605 7.86257L1.13246 5.44363L1.03339 5.49211C0.37677 6.84302 0 8.36005 0 9.96562C0 11.5712 0.37677 13.0881 1.03339 14.4391L4.17667 11.9366Z'
                  fill='#FBBC05'
                />
                <path
                  d='M9.68807 3.85336C11.5073 3.85336 12.7344 4.66168 13.4342 5.33718L16.1684 2.59107C14.4892 0.985496 12.3039 0 9.68807 0C5.89885 0 2.62637 2.23672 1.0332 5.49214L4.16573 7.99466C4.95162 5.59183 7.12608 3.85336 9.68807 3.85336Z'
                  fill='#EB4335'
                />
              </svg>
              <p className='text-lg font-medium ml-4 text-gray-700'>
                Conectar con Google
              </p>
            </button>
            <div className='w-full flex items-center justify-between py-5'>
              <hr className='w-full bg-gray-400' />
              <p className='text-lg font-medium leading-4 px-2.5 text-gray-400'>
                OR
              </p>
              <hr className='w-full bg-gray-400' />
            </div>
            <form onSubmit={handleSubmit(onSubmit)} autoComplete='false'>
              <div>
                <label
                  htmlFor='username'
                  className='text-lg font-medium leading-none text-gray-800'
                >
                  Usuario
                </label>
                <input
                  id='username'
                  type='text'
                  className='bg-gray-200 border rounded-xl text-lg font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2'
                  {...register("username")}
                  aria-invalid={errors.username ? "true" : "false"}
                />
                {errors.username && (
                  <p className='text-red-700'>{errors.username.message}</p>
                )}
              </div>
              <div className='mt-4 w-full'>
                <label
                  htmlFor='password'
                  className='text-lg font-medium leading-none text-gray-800'
                >
                  Contraseña
                </label>
                <div className='relative flex items-center justify-center'>
                  <input
                    id='password'
                    type={show ? "password" : "text"}
                    className='bg-gray-200 border rounded-xl text-lg font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2'
                    {...register("password")}
                  />
                  <div className='absolute right-0 mt-3 mr-3 cursor-pointer'>
                    <button type='button' onClick={() => setShow(!show)}>
                      {show ? (
                        <EyeIcon className='w-6 h-6' />
                      ) : (
                        <EyeSlashIcon className='w-6 h-6' />
                      )}
                    </button>
                  </div>
                </div>
                {errors.password && (
                  <p className='text-red-700'>{errors.password.message}</p>
                )}
              </div>
              <div className='mt-8'>
                <button
                  type='submit'
                  disabled={loading}
                  className={`${
                    loading
                      ? "hover:cursor-not-allowedr bg-gray-600"
                      : "bg-orange-600 hover:bg-orange-500"
                  } focus:ring-2 focus:ring-offset-2 focus:ring-orange-600 text-lg font-semibold leading-none text-black focus:outline-none border rounded-xl py-4 w-full`}
                >
                  Iniciar Sesión
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginPage
