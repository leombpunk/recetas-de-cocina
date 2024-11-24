import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import {
  BookmarkIcon,
  ClockIcon,
  HeartIcon,
  PhotoIcon,
  ShareIcon,
  UserCircleIcon,
  UserIcon,
} from "@heroicons/react/24/outline"
import {
  HeartIcon as HeartIconSolid,
  BookmarkIcon as BookmarkIconSolid,
} from "@heroicons/react/24/solid"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContextNotification } from "../providers/NotificationProvider"
import { useContextUser } from "../providers/UserProvider"
import { RoutesAPI } from "../utils/RoutesAPI"
import useRecipeSearch from "../hooks/useRecipeSearch"
import useLikes from "../hooks/useLikes"
import Loader from "../components/loader/Loader"
import CustomModal from "../components/modals/CustomModal"
import useSaves from "../hooks/useSaves"
import Comments from "../components/comments/Comments"
import NavigationRoutes from "../utils/NavigationRoutes"

const redirectURLs = {
  facebook:'https://www.facebook.com/sharer/sharer.php?u=', //url
  equis:'https://twitter.com/intent/tweet?url=', //url &text= para agregar un mensaje personalizado
  reddit:'https://www.reddit.com/submit?url=', //url
  mailto:'mailto:?subject=¡Mira%20esta%20receta!&body=', //body el mensaje en cuestion
  whatsapp:'https://wa.me/?text=', //texto/mensaje
  linkedin:'https://www.linkedin.com/shareArticle?mini=true&url=', //url
  telegram:'https://t.me/share/url?url=', //url &text= para agregar un mensaje personalizado
}

const RecipePublicPage = () => {
  const [openModal, setOpenModal] = useState(false)
  const [openModalShare, setOpenModalShare] = useState(false)
  const { user } = useContextUser()
  const today = new Date()
  const { id } = useParams()
  const { addNotification } = useContextNotification()
  const { recipe, errors, loading } = useRecipeSearch(id)
  const {
    // loading: likeLoading,
    errors: likeErrors,
    count,
    handleClickLike,
    liked,
    setLiked,
  } = useLikes(id)
  const {
    // loading: saveLoading,
    // errors: saveErrors,
    save,
    setSave,
    handleClickSave,
  } = useSaves(id)

  useEffect(() => {
    if (recipe.likes?.length) {
      setLiked(true)
    } else {
      setLiked(false)
    }

    if (recipe.guardadas?.length) {
      setSave(true)
    } else {
      setSave(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipe])

  useEffect(() => {
    if (errors.length) {
      addNotification({
        message: "Ocurrió un problema con la receta",
        type: "error",
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors])

  useEffect(() => {
    if (likeErrors.length) {
      addNotification({
        message: "Ocurrió un problema con los likes",
        type: "error",
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [likeErrors])

  const onClickLike = () => {
    user ? handleClickLike() : setOpenModal(true)
  }

  const onClickSave = () => {
    user ? handleClickSave(id) : setOpenModal(true)
  }

  const onClickShared = () => {
    setOpenModalShare(true)
    console.log(openModalShare)
  }

  const copyToClipboard = (event) => {
    event.preventDefault()
    // console.log(window.location.href)
    navigator.clipboard.writeText(window.location.href)
    addNotification({ message: "Enlace copiado al portapapeles", type: "info" })
  }

  return (
    <>
      <main className='bg-orange-300'>
        {loading ? (
          <Loader />
        ) : (
          <section className='mx-auto max-w-2xl px-1 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
            <figure className='w-full'>
              {recipe.imagen ? (
                <img
                  src={`${RoutesAPI.public}/${recipe.usuario.usuario}/${recipe.imagen}`}
                  alt='Imagen portada de receta'
                  className='w-full h-[50vh] rounded-2xl object-cover object-top'
                  style={{ aspectRatio: "16/9" }}
                />
              ) : (
                <div className='bg-gray-200 w-full h-full py-36 rounded-2xl flex flex-col items-center justify-center'>
                  <PhotoIcon className='h-40 w-40 text-gray-400' />
                  <p className='text-gray-400 font-semibold text-center text-xl'>
                    Imagen no disponible
                  </p>
                </div>
              )}
            </figure>
            <div className='z-[1] w-full flex flex-col lg:flex-row items-center justify-between mt-10 px-2 sticky top-0 py-5 bg-orange-300 shadow-sm border-b border-gray-500/50'>
              <h1 className='text-gray-900 text-4xl capitalize font-bold'>
                {recipe.titulo}
              </h1>
              <div className='flex self-end gap-4'>
                {loading ? null : (
                  <button
                    type='button'
                    className='flex flex-row gap-1 items-center text-xl font-semibold group'
                    title='Me gusta'
                    onClick={() => onClickLike()}
                  >
                    {liked ? (
                      <HeartIconSolid className='w-10 h-10 text-red-700 group-hover:scale-105 duration-300' />
                    ) : (
                      <HeartIcon className='w-10 h-10 group-hover:text-red-700 group-hover:scale-105 duration-300' />
                    )}

                    <span>{count}</span>
                  </button>
                )}
                <button
                  type='button'
                  title='Compartir'
                  onClick={() => onClickShared()}
                >
                  <ShareIcon className='w-10 h-10 hover:scale-105 duration-300' />
                </button>
                {loading ? null : (
                  <button
                    type='button'
                    title='Guardar Receta'
                    className='group'
                    onClick={() => onClickSave()}
                  >
                    {save ? (
                      <BookmarkIconSolid className='w-10 h-10 group-hover:scale-105 duration-300' />
                    ) : (
                      <BookmarkIcon className='w-10 h-10 group-hover:scale-105 duration-300' />
                    )}
                  </button>
                )}
              </div>
            </div>
            <div className='w-full flex flex-col md:flex-row gap-3 items-start md:items-center justify-end mt-5 px-2'>
              <Link
                className='flex flex-row items-center gap-3 text-lg hover:underline font-semibold duration-500'
                title='Mostrar todas las recetas de este usuario'
                to={`${NavigationRoutes.Search}/?username=${recipe.usuario.usuario}`} //agregar el link
              >
                {recipe.usuario.imagen ? (
                  <img
                    src={`${RoutesAPI.public}/${recipe.usuario.usuario}/${recipe.usuario.imagen}`}
                    alt='imagen perfil'
                    className='h-8 w-8 rounded-full'
                  />
                ) : (
                  <UserCircleIcon className='h-8 w-8 rounded-full text-gray-900 bg-gray-300' />
                )}
                {recipe.usuario.usuario}
              </Link>
              <div className='text-lg italic text-gray-600 hover:cursor-default'>
                Publicado:{" "}
                <span>
                  {recipe.updateAt
                    ? recipe.updateAt.split("T").shift()
                    : today.toISOString().split("T").shift()}
                </span>
              </div>
            </div>
            <div className='px-2 flex flex-col gap-3 mt-10'>
              <h2 className='text-3xl font-semibold'>Introducción</h2>
              <div className='flex flex-row items-center gap-4'>
                {recipe.comensales ? (
                  <div className='flex flex-row items-center text-gray-600 gap-1'>
                    <UserIcon className='h-6 w-6' title='porciones' />{" "}
                    <span> {recipe.comensales}</span>
                  </div>
                ) : (
                  ""
                )}
                {recipe.duracion ? (
                  <div className='flex flex-row items-center text-gray-600 gap-1'>
                    <ClockIcon className='h-6 w-6' title='duración' />{" "}
                    <span>{recipe.duracion}</span>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <p className='text-lg'>{recipe.detalle}</p>
            </div>
            <div className='px-2 flex flex-col gap-3 mt-10'>
              <h2 className='text-3xl font-semibold'>Ingredientes</h2>
              <ul className='list-item bg-orange-400 p-3 rounded-2xl shadow-sm shadow-black/30'>
                {recipe.ingredientes.map((ingrediente, index) => (
                  <li
                    key={index}
                    id={`ingrediente-${index}`}
                    className='list-disc list-inside text-lg'
                  >
                    {ingrediente.name}
                  </li>
                ))}
              </ul>
            </div>
            <div className='px-2 flex flex-col gap-3 mt-10'>
              <h2 className='text-3xl font-semibold'>Preparación</h2>
              <ul className='list-item bg-orange-400 p-3 rounded-2xl shadow-sm shadow-black/30'>
                {recipe.pasos.map((paso, index) => (
                  <li
                    key={index}
                    id={`paso-${index}`}
                    className='list-disc list-inside text-lg'
                  >
                    <span>{paso.paso}</span>
                    {paso.imagen ? (
                      <img
                        src={`${RoutesAPI.public}/${recipe.usuario.usuario}/${paso.imagen}`}
                        alt='imagen del paso'
                      />
                    ) : (
                      ""
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <Comments recipeId={recipe.id} onNotLogin={setOpenModal} />
            <CustomModal
              open={openModal}
              setOpen={setOpenModal}
              confirm={false}
              setConfirm={null}
            >
              <>
                <h1 className='mt-10 text-3xl font-semibold leading-6 text-gray-900 text-center border-b-2 border-gray-400/50 pb-5'>
                  Aún no eres miembro! 😲
                </h1>
                <div className='mt-8 mb-6 flex flex-col items-center justify-center w-full gap-2'>
                  <h2 className='text-gray-800 text-center font-medium text-xl leading-6'>
                    Inicia Sesión
                  </h2>
                  <button className='bg-orange-400 hover:bg-orange-300 w-3/4 py-3 hover:scale-105 duration-300 font-semibold shadow-md hover:shadow-black/50 rounded-xl text-2xl'>
                    Ingresar
                  </button>
                  <div className='flex w-full mt-7 items-center text-center gap-4'>
                    <hr className='border-gray-400 border-1 w-full rounded-md' />
                    <p className='text-gray-500 italic text-center font-medium text-lg leading-6'>
                      O
                    </p>
                    <hr className='border-gray-400 border-1 w-full rounded-md' />
                  </div>

                  <h2 className='text-gray-800 text-center font-medium text-xl leading-6'>
                    Registrate
                  </h2>
                  <p className='text-gray-500 italic text-center font-medium text-lg leading-6'>
                    (es gratis)
                  </p>
                  <button className='bg-orange-400 hover:bg-orange-300 w-3/4 py-3 hover:scale-105 duration-300 font-semibold shadow-md hover:shadow-black/50 rounded-xl text-2xl'>
                    Registro
                  </button>
                </div>
              </>
            </CustomModal>
            <CustomModal
              open={openModalShare}
              setOpen={setOpenModalShare}
              confirm={false}
              setConfirm={null}
            >
              <>
                <div className="mt-6">
                  <h2 className="text-2xl font-semibold text-center">Comparte en tus redes 🥰</h2>
                  <div className="grid grid-cols-5 items-center justify-center gap-6 w-full my-8">
                    <button type="button" className="group" title="Copiar en portapapeles" onClick={(e) => copyToClipboard(e)}>
                      <FontAwesomeIcon icon="fa-solid fa-link" size="3x" className="group-hover:scale-105 duration-300 text-gray-800" />
                    </button>
                    <Link className="group" target="_blank" title="" to={`${redirectURLs.facebook}${window.location.href}`}>
                      <FontAwesomeIcon icon="fa-brands fa-facebook" size="3x" className="group-hover:scale-105 duration-300 text-blue-700" />
                    </Link>
                    <Link className="group" target="_blank" title="" to={`${redirectURLs.whatsapp}${window.location.href}`}>
                      <FontAwesomeIcon icon="fa-brands fa-whatsapp" size="3x" className="group-hover:scale-105 duration-300 text-green-500" />
                    </Link>
                    <Link className="group" target="_blank" title="" to={`${redirectURLs.telegram}${window.location.href}`}>
                      <FontAwesomeIcon icon="fa-brands fa-telegram" size="3x" className="group-hover:scale-105 duration-300 text-sky-500" />
                    </Link>
                    <Link className="group" target="_blank" title="" to={`${redirectURLs.reddit}${window.location.href}`}>
                      <FontAwesomeIcon icon="fa-brands fa-reddit" size="3x" className="group-hover:scale-105 duration-300 text-orange-600" />
                    </Link>
                    <Link className="group" target="_blank" title="" to={`${redirectURLs.equis}${window.location.href}`}>
                      <FontAwesomeIcon icon="fa-brands fa-x-twitter" size="3x" className="group-hover:scale-105 duration-300" />
                    </Link>
                    <Link className="group" target="_blank" title="" to={`${redirectURLs.linkedin}${window.location.href}`}>
                      <FontAwesomeIcon icon="fa-brands fa-linkedin" size="3x" className="group-hover:scale-105 duration-300 text-blue-800" />
                    </Link>
                    <Link className="group" target="_blank" title="" to={`${redirectURLs.mailto}${window.location.href}`}>
                      <FontAwesomeIcon icon="fa-solid fa-envelope" size="3x" className="group-hover:scale-105 duration-300 text-gray-700" />
                    </Link>
                  </div>
                </div>
              </>
            </CustomModal>
          </section>
        )}
      </main>
    </>
  )
}

export default RecipePublicPage
