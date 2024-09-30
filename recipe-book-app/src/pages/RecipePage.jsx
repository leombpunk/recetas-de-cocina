import RecipeForm from "../components/recipe-form/RecipeForm"
import { useContextNotification } from "../providers/NotificationProvider"

import useRecipe from "../hooks/useRecipe"
import Loader from "../components/loader/Loader"
import { useParams } from "react-router-dom"

const RecipePage = () => {
  const { id } = useParams()
  // console.log(id)
  const { addNotification } = useContextNotification()
  const { loading, recipe, updateRecipe, deleteRecipe } = useRecipe(id)

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <main className='bg-orange-300'>
          <section className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
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
          </section>
        </main>
      )}
    </>
  )
}

export default RecipePage
