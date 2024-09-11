import { useEffect } from "react"
import RecipeForm from "../components/recipe-form/RecipeForm"
import { useContextNotification } from "../providers/NotificationProvider"
import {
  saveRecipeLocal,
  getRecipeLocal,
  recipeStruct,
} from "../utils/RecipeLocal"
import useRecipe from "../hooks/useRecipe"
import Loader from "../components/loader/Loader"

const RecipePage = ({ idRecipe }) => {
  const recipeLocal = getRecipeLocal()
  // console.log(recipeLocal)
  //si hay, cargar los datos en el formulario
  //si no hay nada crear el "dato" en localstorage/server
  const { addNotification } = useContextNotification()
  const { recipe, createRecipe, updateRecipe, deleteRecipe, getRecipe } =
    useRecipe()

  //al iniciar el componente verificar si existe algun dato en localstorage/server
  useEffect(() => {
    if (!recipeLocal) {
      createRecipe()
    } else {
      // console.log(recipeLocal)
      getRecipe(idRecipe || recipeLocal.id)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    saveRecipeLocal(recipe)
  }, [recipe])

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
