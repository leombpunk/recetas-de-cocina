import { Link } from "react-router-dom"
import { RoutesAPI } from "../../utils/RoutesAPI"
import { PhotoIcon, HeartIcon, ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/solid"
// import {  } from "@heroicons/react/24/outline"
import { useContextUser } from "../../providers/UserProvider"
import useLikes from "../../hooks/useLikes"

const RecipeCard = ({ linkActive, recipe, navigation, children }) => {
  const { user } = useContextUser()
  //agregado contador de likes
  const { count } = useLikes(recipe.id)
  //agregar contador de comentarios + respuestas
  // --> aquí
  return (
    <Link
      to={`${linkActive ? `${navigation}/${recipe.id}` : "#"}`}
      title={recipe.titulo}
      className={`${
        linkActive ? "" : "hover:cursor-default"
      } group border border-gray-500 rounded-lg shadow-md hover:shadow-black/50 p-1 duration-500`}
    >
      {children}
      <div className='aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7'>
        {recipe.imagen ? (
          <img
            src={`${RoutesAPI.public}/${
              recipe.usuario?.usuario ?? user.usuario
            }/${recipe.imagen}`}
            alt={recipe.imagen}
            className='h-full w-full object-cover object-center group-hover:opacity-90'
          />
        ) : (
          <div className='w-full h-full flex flex-col items-center justify-center'>
            <PhotoIcon className='h-32 w-32 text-gray-400' />
            <p className='text-gray-400 font-semibold text-center text-xl'>
              Imagen no disponible
            </p>
          </div>
        )}
      </div>
      <h3 className='mt-2 text-lg text-gray-700'>
        {recipe.titulo !== "" ? recipe.titulo : "Sin tittulo"}
      </h3>
      <div className='grid grid-cols-2'>
        <p className='flex flex-row items-center gap-1'>
          <HeartIcon className='h-6 w-6 text-red-600' title="likes" /> {count}
        </p>
        <p className='flex flex-row items-center gap-1'>
          <ChatBubbleBottomCenterTextIcon className='h-6 w-6 text-gray-600' title="comentarios" /> comentarios
        </p>
      </div>
      {recipe.visibilidad !== undefined ? (
        <p>
          Estado:{" "}
          <span>
            {!recipe.checked
              ? "Borrador"
              : recipe.visibilidad
              ? "Público"
              : "Privado"}
          </span>
        </p>
      ) : null}
    </Link>
  )
}

export default RecipeCard
