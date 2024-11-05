import { useParams } from "react-router-dom"
import RecipeForm from "../components/recipe-form/RecipeForm"
import { useContextNotification } from "../providers/NotificationProvider"
import useRecipe from "../hooks/useRecipe"
import Loader from "../components/loader/Loader"
import { useContextUser } from "../providers/UserProvider"
import { useEffect } from "react"

const RecipePage = () => {
  const { id } = useParams()
  console.log(id)
  const { user } = useContextUser()
  const { addNotification } = useContextNotification()
  const { loading, recipe, notify, updateRecipe, deleteRecipe, patchRecipe } = useRecipe(id, user.usuario)

  useEffect(() => {
    addNotification(notify)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notify])

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
                handlePatch={patchRecipe}
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
