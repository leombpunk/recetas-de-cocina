import { Link } from "react-router-dom"
// import { RoutesAPI } from "../../utils/RoutesAPI"
import { PhotoIcon, HeartIcon, ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/solid"
// import {  } from "@heroicons/react/24/outline"
// import useLikes from "../../hooks/useLikes"
// import { useContextUser } from "../../providers/UserProvider"

const RecipeCard = ({ linkActive, recipe, navigation, children }) => {
  // const { user } = useContextUser()
  //agregado contador de likes
  // const { count } = useLikes(recipe.id)
  //agregar contador de comentarios + respuestas
  // --> aquí
  return (
    <Link
      to={`${linkActive ? `${navigation}/${recipe.id}` : "#"}`}
      title={recipe.titulo}
      className={`${
        linkActive ? "" : "hover:cursor-default"
      } group border border-gray-600 bg-orange-400 rounded-lg shadow-md hover:shadow-black/50 p-1 duration-500`}
    >
      {children}
      <div className='aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7'>
        {recipe.urlPublica ? (
          <img
            src={`${recipe.urlPublica}`}
            alt={recipe.titulo || "foto representativa de la receta"}
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
      <h3 className='mt-2 text-lg text-gray-900 font-medium truncate'>
        {recipe.titulo !== "" ? recipe.titulo : "Sin tittulo"}
      </h3>
      <div className='flex flex-row w-full justify-end gap-4 items-center px-2'>
        <p className='flex flex-row items-center gap-1 font-medium'>
          <HeartIcon className='h-6 w-6 text-red-600' title="likes" /> {recipe?.countLikes}
        </p>
        <p className='flex flex-row items-center gap-1 font-medium'>
          <ChatBubbleBottomCenterTextIcon className='h-6 w-6 text-gray-600' title="comentarios" /> {recipe?.countComments}
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
