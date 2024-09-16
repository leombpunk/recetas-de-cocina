import RecipeForm from "../components/recipe-form/RecipeForm"
import { useContextNotification } from "../providers/NotificationProvider"

import useRecipe from "../hooks/useRecipe"
import Loader from "../components/loader/Loader"

const RecipePage = ({ idRecipe = null }) => {  
  const { addNotification } = useContextNotification()
  const { recipe, createRecipe, updateRecipe, deleteRecipe, getRecipe } =
    useRecipe({idRecipe})

  return (
    <>
      <section className='bg-orange-300'>
        <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
          {recipe ? (
            <RecipeForm
              title='Nueva Receta'
              handleNotification={addNotification}
              data={recipe}
              handleSave={updateRecipe}
              handleDelete={deleteRecipe}
            />
          ) : (
            <Loader />
          )}
        </div>
      </section>
    </>
  )
}

export default RecipePage
