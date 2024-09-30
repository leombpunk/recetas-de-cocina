import { Link, useParams } from "react-router-dom"
import {
  ArrowUturnRightIcon,
  BookmarkIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  ClockIcon,
  HeartIcon,
  PhotoIcon,
  ShareIcon,
  UserCircleIcon,
  UserIcon,
} from "@heroicons/react/24/outline"
import { RoutesAPI } from "../utils/RoutesAPI"
import useRecipeSearch from "../hooks/useRecipeSearch"
import Loader from "../components/loader/Loader"

const RecipePublicPage = () => {
  const { id } = useParams()
  const { recipe, errors, loading } = useRecipeSearch(id)

  console.log({ r: recipe, e: errors, l: loading })

  return (
    <>
      <main className='bg-orange-300'>
        {loading ? (
          <Loader />
        ) : (
          <section className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
            <figure className='w-full'>
              {/*w-9/12 h-96 bg-cover bg-center rounded-lg*/}
              {recipe.imagen ? (
                <img
                  src={`${RoutesAPI.staticFiles}/${recipe.imagen}`}
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
            <div className='w-full flex flex-col lg:flex-row items-center justify-between mt-5 px-2'>
              <h1 className='text-gray-900 text-4xl capitalize font-bold'>
                {recipe.titulo}
              </h1>
              <div className='flex self-end gap-3'>
                <button
                  type='button'
                  className='flex flex-row gap-1 items-center text-xl font-semibold group'
                  title='Me gusta'
                >
                  <HeartIcon className='w-10 h-10 group-hover:text-red-700 group-hover:scale-105 duration-300' />
                  <span>9999</span>
                </button>
                <button type='button' title='Compartir'>
                  <ShareIcon className='w-10 h-10' />
                </button>
                <button type='button' title='Guardar Receta'>
                  <BookmarkIcon className='w-10 h-10' />
                </button>
              </div>
            </div>
            <div className='w-full flex flex-row gap-3 items-center justify-end mt-3 px-2'>
              <Link
                className='flex flex-row items-center gap-3 text-lg hover:underline font-semibold duration-500'
                title='Mostrar todas las recetas de este usuario'
                to={"#"}
              >
                {recipe.usuario.imagen ? (
                  <img
                    src={`${RoutesAPI.staticFiles}/avatars/${recipe.usuario.imagen}`}
                    alt='imagen perfil'
                    className='h-8 w-8 rounded-full'
                  />
                ) : (
                  <UserCircleIcon className='h-8 w-8 rounded-full text-gray-900 bg-gray-300' />
                )}

                {recipe.usuario.usuario}
              </Link>
              <div className='text-lg italic text-gray-600 hover:cursor-default'>
                Publicado: <span>{Date.now()}</span>
              </div>
            </div>
            <div className='px-2 flex flex-col gap-3 mt-3'>
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
            <div className='px-2 flex flex-col gap-3 mt-3'>
              <h2 className='text-3xl font-semibold'>Ingredientes</h2>
              <ul className='list-item bg-orange-400 p-3 rounded-2xl shadow-sm shadow-black/30'>
                {recipe.ingredientes.map((ingrediente, index) => (
                  <li
                    id={`ingrediente-${index}`}
                    className='list-disc list-inside text-lg'
                  >
                    {ingrediente.name}
                  </li>
                ))}
              </ul>
            </div>
            <div className='px-2 flex flex-col gap-3 mt-3'>
              <h2 className='text-3xl font-semibold'>Preparación</h2>
              <ul className='list-item bg-orange-400 p-3 rounded-2xl shadow-sm shadow-black/30'>
                {recipe.pasos.map((paso, index) => (
                  <li
                    id={`paso-${index}`}
                    className='list-disc list-inside text-lg'
                  >
                    <span>{paso.paso}</span>
                    {paso.imagen ? (
                      <img
                        src={`${RoutesAPI.staticFiles}/${paso.imagen}`}
                        alt='imagen del paso'
                      />
                    ) : (
                      ""
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div className='px-2 flex flex-col gap-3 mt-3'>
              <h2 className='text-3xl font-semibold'>Comentarios</h2>
              <div className='w-full bg-orange-400 rounded-2xl shadow-sm shadow-black/30 p-5'>
                <form className='w-full mt-3 pt-5 pb-3 pl-20 pr-3 border-b-2 border-black/40'>
                  <textarea
                    className='w-full bg-orange-200 rounded-2xl'
                    placeholder='Deja un comentario al autor de esta receta'
                    rows={5}
                  ></textarea>
                  <div className="flex flex-row justify-end items-center">
                    <button
                      type='submit'
                      className='flex flex-row items-center gap-1 bg-orange-500 py-2 px-3 rounded-2xl font-semibold shadow-sm hover:shadow-black/40 hover:bg-orange-300'
                    >
                      <ChatBubbleOvalLeftEllipsisIcon className='w-5 h-5' />
                      Comentar
                    </button>
                  </div>
                </form>
                <div className='mt-4'>
                  <div className='flex flex-col gap-1'>
                    <Link
                      to={"#"}
                      className='flex flex-row items-center gap-2 text-lg font-semibold hover:underline duration-300'
                    >
                      {false ? (
                        <img
                          src={`${RoutesAPI.staticFiles}/avatars/${recipe.usuario.imagen}`}
                          alt='imagen perfil'
                          className='h-8 w-8 rounded-full'
                        />
                      ) : (
                        <UserCircleIcon className='h-8 w-8 rounded-full text-gray-900 bg-gray-300' />
                      )}
                      {"nombre de usuario"}
                    </Link>
                    <div className='text-gray-600 italic text-sm pl-5 list-item list-disc list-inside'>
                      Comentado el {Date.now()}
                    </div>
                    <p className='pl-10 pr-28'>
                      Me gusto mucho la wea de receta qlia ameo, la hice y todos
                      me dijeron que era la mea guata, conchetumare, equisde de
                      de de de de de de de de de de
                    </p>
                    <div className='flex flex-row w-full items-center gap-2 pl-10'>
                      <button
                        type='button'
                        className='flex flex-row items-center gap-1 bg-orange-500 py-2 px-3 rounded-2xl font-semibold shadow-sm hover:shadow-black/40 hover:bg-orange-300'
                      >
                        <ArrowUturnRightIcon className='h-5 w-5' /> Responder
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  )
}

export default RecipePublicPage
