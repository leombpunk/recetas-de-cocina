import {Link} from 'react-router-dom'
import { RoutesAPI } from '../../utils/RoutesAPI'
import { PhotoIcon } from '@heroicons/react/20/solid'
import { HeartIcon, ChatBubbleOvalLeftIcon } from "@heroicons/react/24/outline"

const RecipeCard = ({ recipe, navigation }) => {
  return (
    <Link to={`${navigation}/${recipe.id}`} title={recipe.titulo} className='group border border-gray-500 rounded-lg shadow-md hover:shadow-black/50 p-1'>
      <div className='aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7'>
      {recipe.imagen ? <img
          src={`${RoutesAPI.staticFiles}/${recipe.imagen}`}
          alt={recipe.imagen}
          className='h-full w-full object-cover object-center group-hover:opacity-75'
        />:
        <div className='w-full h-full flex flex-col items-center justify-center'>
          <PhotoIcon className='h-32 w-32 text-gray-400' />
          <p className='text-gray-400 font-semibold text-center text-xl'>Imagen no disponible</p>
        </div>}
        
      </div>
      <h3 className='mt-2 text-lg text-gray-700'>{recipe.titulo}</h3>
      <div className='grid grid-cols-2'>
        <p className='flex flex-row items-center gap-1'><HeartIcon className='h-5 w-5' /> me gusta</p>
        <p className='flex flex-row items-center gap-1'><ChatBubbleOvalLeftIcon className='h-5 w-5' /> comentarios</p>
      </div>
      <p>Estado: <span>{ !recipe.checked ? 'Borrador':recipe.visibilidad ? 'Público':'Privado' } </span></p>
    </Link>
  )
}

export default RecipeCard