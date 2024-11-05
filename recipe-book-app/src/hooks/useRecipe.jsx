import { useEffect, useState } from "react"
import { isEqual } from "lodash"
import RecipesServices from "../services/Recipes"
import { saveRecipeLocal, getRecipeLocal } from "../utils/RecipeLocal"

const useRecipe = (recetaId, username) => {
  console.log({ recetaid: recetaId })
  const [loading, setLoading] = useState(true)
  const [requesting, setRequesting] = useState(false)
  const [errors, setErrors] = useState([])
  const [recipe, setRecipe] = useState(null)
  const [notify, setNotify] = useState({})
  const [recipeLocal, setRecipeLocal] = useState(null)

  const getRecipe = async () => {
    try {
      setLoading(true)
      const result = await RecipesServices.getRecipe(recetaId)
      console.log({ get: result })
      if (result.status === 200) {
        setRecipe(result.data.data)
      } else {
        setNotify({ mmessage: "No se pudo recuperar los datos de la receta!", type: "error" })
      }
    } catch (error) {
      console.log(error)
      setErrors([error])
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  const createRecipe = async (recipeData) => {
    try {
      setLoading(true)
      const result = await RecipesServices.createRecipe(recipeData)
      //comprobar cual es el resultado
      if (result.status === 200) {
        console.log({ create: result })
        //comprobar si existe una receta guardada en localstorage
        if (recipeLocal) {
          //compara si tienen el mismo id --> debería ser el mismo
          if (result.data.data?.id === recipeLocal.id) {
            //comparar que la esctructura y datos sean iguales
            if (isEqual(result.data.data, recipeLocal)) {
              setRecipe(result.data.data)
            } else {
              //si no son iguales podría usar lo que esta guardado en localstorage
              //y guardarlo en 'recipe'
              setRecipe(recipeLocal)
            }
          } else {
            //ver porque no son iguales, algo en la lógica debe estar mal
            console.log('ahora que mierda pasó!!!')
          }
        } else {
          //si no existe nada en localstorage
          //guardo el resultado obtenido del backend
          saveRecipeLocal(username, result.data.data)
          setRecipe(result.data.data)
        }
      } else {
        setNotify({ message: "No se pudo crear la receta", type: "error" })
      }
    } catch (error) {
      console.log(error)
      setErrors([error])
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  //testear
  const patchRecipe = async (recipeData) => {
    try {
      setRequesting(true)
      const result = await RecipesServices.patchRecipe(recipe.id, recipeData)
      console.log({ patch: result })
      if (result.status === 200) {
        setRecipe(recipe)
      }
    } catch (error) {
      console.log(error)
      setErrors([error])
      setRequesting(false)
    } finally {
      setRequesting(false)
    }
  }

  const updateRecipe = async (recipeData) => {
    try {
      setRequesting(true)
      const result = await RecipesServices.updateRecipe(recipe.id, recipeData)
      console.log({ update: result })
      if (result.status === 200) {
        setRecipe(recipe)
      }
    } catch (error) {
      console.log(error)
      setErrors([error])
      setRequesting(false)
    } finally {
      setRequesting(false)
    }
  }

  const deleteRecipe = async () => {
    try {
      setRequesting(true)
      const result = await RecipesServices.deleteRecipe(recipe.id)
      console.log({ delete: result })
      if (result) {
        setRecipe(null)
      }
    } catch (error) {
      console.log(error)
      setErrors([error])
      setRequesting(false)
    } finally {
      setRequesting(false)
    }
  }

  useEffect(() => {
    //si hay un id busca esa receta
    if (recetaId) {
      console.log("useEffect fetching de datos de receta")
      getRecipe(recetaId)
    } else {
      //si no hay id intenta crear una nueva receta
      console.log("useEffect create receta")
      createRecipe()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recetaId])

  useEffect(() => {
    if (username) {
      setRecipeLocal(getRecipeLocal(username))
    }
  }, [username])

  // useEffect(() => {
  //   console.log("2do hook")
  //   if (!recipeLocal) {
  //     console.log("primer if")
  //     createRecipe()
  //   } else if (!recetaId) {
  //     console.log("segundo if")
  //     // console.log({ local: recipeLocal })
  //     // getRecipe(idRecipe || recipeLocal.id) //esto sobreescribe la receta guardada en localStorage
  //     setRecipe(recipeLocal)
  //     setLoading(false)
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [recetaId])

  // //actualiza el localStorage al cambiar recipe
  // useEffect(() => {
  //   console.log("3er hook")
  //   //si !recetaId guardo la receta
  //   if (!recetaId) {
  //     console.log("if saverecipelocal", recipe)
  //     saveRecipeLocal(recipe)
  //     // setLoading(false)
  //   }
  // }, [recipe])

  return {
    recipe,
    errors,
    loading,
    requesting,
    notify,
    patchRecipe,
    updateRecipe,
    deleteRecipe,
  }
}

export default useRecipe
