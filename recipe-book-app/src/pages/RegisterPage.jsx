import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import bgImage from "../assets/images/vectorstock_49097965.webp"
import NavigationRoutes from "../utils/NavigationRoutes"
import logo from "../assets/images/logo-y-nombre.png"
import RegisterSchema from "../utils/RegisterResolver"
import useRegister from "../hooks/useRegister"
import { useEffect } from "react"
import { useContextNotification } from "../providers/NotificationProvider"
import { RoutesAPI } from "../utils/RoutesAPI"
import { setToken } from "../utils/Token"

const RegisterPage = () => {
  const { addNotification } = useContextNotification()
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const {
    errors: registerError,
    loading,
    notify,
    response,
    userRegister,
  } = useRegister()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      mail: "",
      username: "",
      password: "",
    },
    resolver: yupResolver(RegisterSchema),
  })

  const onSubmit = (data) => {
    console.log({ data })
    userRegister(data)
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
      navigate(NavigationRoutes.Profile)
    }
  }, [searchParams])

  useEffect(() => {
    if (notify) {
      addNotification(notify)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[notify])

  useEffect(() => {
    if (response?.status === 201) {
      // addNotification({ message: "Por favor, inicia sesión 🥰", type: "info" })
      // navigate(NavigationRoutes.Home)
      navigate(NavigationRoutes.Profile)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[response])

  return (
    <>
      <div className='bg-gradient-to-tl from-orange-300 to-orange-700'>
        <div className='flex justify-center min-h-screen max-h-screen h-auto'>
          <div
            className='hidden bg-cover lg:block lg:w-2/3'
            style={{
              backgroundImage: `url(${bgImage})`,
            }}
          >
            <div className='flex items-center h-full px-20 bg-gray-900 bg-opacity-40'>
              {/* <div className='flex items-center justify-center bg-white/80 rounded-full w-64 h-64'>
                <picture>
                  <img
                    className='focus:outline-none'
                    src={logo}
                    alt='logotipo'
                    style={{ width: "250px", height: "165px" }}
                  />
                </picture>
              </div> */}
            </div>
          </div>

          <div className='flex items-center w-full max-w-md px-6 py-4 mx-auto lg:w-2/6 overflow-auto'>
            <div className='flex flex-col gap-2.5 pt-6'>
              <div className='flex flex-col items-center justify-center text-center gap-1'>
                <picture>
                  <img
                    className='focus:outline-none'
                    src={logo}
                    alt='logotipo'
                    style={{ width: "250px", height: "165px" }}
                  />
                </picture>

                <p className='text-xl mt-0 font-medium text-gray-900'>
                  Registrate y comparte tus recetas con otros usuarios
                </p>
              </div>

              <div className='mt-0'>
                <button
                  onClick={(e) => handleClickRegisterGoogle(e)}
                  type='button'
                  aria-label='Continue with google'
                  className='focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border rounded-xl border-gray-500 bg-gray-200 flex items-center w-full mt-0 shadow-md'
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
                  <p className='text-lg font-medium ml-4 text-gray-900'>
                    Regístrate con Google
                  </p>
                </button>
                <div className='w-full flex items-center justify-between py-5'>
                  <hr className='w-full border-gray-600' />
                  <p className='text-lg font-medium leading-4 px-2.5 text-gray-900'>
                    OR
                  </p>
                  <hr className='w-full border-gray-600' />
                </div>
                <form
                  autoComplete='off'
                  className='flex flex-col items-center justify-center gap-1.5 w-full'
                  onSubmit={handleSubmit(onSubmit)}
                >
                  {/* <div className="w-full">
                    <label
                      htmlFor='names'
                      className='text-lg font-medium leading-none text-gray-800'
                    >
                      Nombres
                    </label>
                    <input
                      type='text'
                      name='names'
                      id='names'
                      placeholder='Nombres'
                      className='bg-gray-200 border rounded-xl text-lg font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-0 shadow-md'
                    />
                  </div>
                  <div className='w-full'>
                    <label
                      htmlFor='surnames'
                      className='text-lg font-medium leading-none text-gray-800'
                    >
                      Apellidos
                    </label>
                    <input
                      type='text'
                      name='surnames'
                      id='surnames'
                      placeholder='Apellidos'
                      className='bg-gray-200 border rounded-xl text-lg font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-0 shadow-md'
                    />
                  </div> */}
                  <div className='w-full'>
                    <label
                      htmlFor='email'
                      className='text-lg font-medium leading-none text-gray-800'
                    >
                      Correo electrónico
                    </label>
                    <input
                      type='email'
                      name='mail'
                      id='mail'
                      placeholder='correo@dominio.com'
                      className='bg-gray-200 border rounded-xl text-lg font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-0 shadow-md'
                      {...register("mail")}
                    />
                  </div>
                  <div className='w-full'>
                    <label
                      htmlFor='username'
                      className='text-lg font-medium leading-none text-gray-800'
                    >
                      Nombre de usuario
                    </label>
                    <input
                      type='text'
                      name='username'
                      id='username'
                      placeholder='Nombre de usuario'
                      className='bg-gray-200 border rounded-xl text-lg font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-0 shadow-md'
                      {...register("username")}
                    />
                  </div>
                  <div className='w-full'>
                    <label
                      htmlFor='password'
                      className='text-lg font-medium leading-none text-gray-800'
                    >
                      Contraseña
                    </label>
                    <input
                      type='password'
                      name='password'
                      id='password'
                      placeholder='Contraseña'
                      className='bg-gray-200 border rounded-xl text-lg font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-0 shadow-md'
                      {...register("password")}
                    />
                  </div>

                  <div className='w-full py-3'>
                    <button
                      type='submit'
                      title='Resgistrarse'
                      disabled={false}
                      className={`${
                        false
                          ? "hover:cursor-not-allowedr bg-gray-600"
                          : "bg-orange-600 hover:bg-orange-500"
                      } focus:ring-0 focus:ring-offset-0 text-lg font-semibold leading-none text-black focus:outline-none rounded-xl py-4 w-full shadow-md`}
                    >
                      Registrarse
                    </button>
                  </div>
                </form>

                <p className='text-xl text-center font-semibold text-gray-700'>
                  Ya tienes cuenta?{" "}
                  <Link
                    to={NavigationRoutes.Login}
                    className='text-black focus:outline-none focus:underline hover:underline'
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
