const recipeStruct = {
  id: 0,
  titulo: "",
  imagen: "",
  urlPublica: "",
  detalle: "",
  comensales: "",
  duracion: "",
  ingredientes: [{name:""}], //[{ orden: 0, ingrediente: "", cantidad: "" }]
  pasos: [{ paso: "", imagen: "", urlPublica: "" }], //[{ orden: 0, paso: "", imagen: "" }]
  checked: 0,
  visibilidad: 0,
}

const dictionary = [
  "id",
  "titulo",
  "imagen",
  "urlPublica",
  "detalle",
  "comensales",
  "duracion",
  "ingredientes",
  "pasos",
  "checked",
  "visibilidad",
]

const sanityRecipe = (recipe) => {
  Array.from(recipe).map((value) => {
    console.log(value)
    // dictionary.includes(value)
    return value
  })
}

//guarda o crea en localstorage
const saveRecipeLocal = (username, recipe) => {
  const data = JSON.stringify(recipe)
  localStorage.setItem(`RecipeApp-${username}`, data)
}

//busca en locastorage
const getRecipeLocal = (username) => {
  const data = localStorage.getItem(`RecipeApp-${username}`)
  return data ? JSON.parse(data) : undefined
}

//elimina de localstorage
const deleteRecipeLocal = (username) => {
  localStorage.removeItem(`RecipeApp-${username}`)
}

export { saveRecipeLocal, deleteRecipeLocal, getRecipeLocal, recipeStruct, dictionary, sanityRecipe }
