const recipeStruct = {
  id: 0,
  titulo: "",
  imagen: "",
  detalle: "",
  comensales: "",
  duracion: "",
  ingredientes: [], //[{ orden: 0, ingrediente: "", cantidad: "" }]
  pasos: [{ paso: "", imagen: "" }], //[{ orden: 0, paso: "", imagen: "" }]
  checked: 0,
  visibilidad: 0,
}

const dictionary = [
  "id",
  "titulo",
  "imagen",
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

//guarda en localstorage
const saveRecipeLocal = (recipe) => {
  const data = JSON.stringify(recipe)
  localStorage.setItem("RecipeApp", data)
}

const getRecipeLocal = () => {
  const data = localStorage.getItem("RecipeApp")
  return JSON.parse(data)
}

//elimina de localstorage
const deleteRecipeLocal = () => {
  localStorage.removeItem("RecipeApp")
}

export { saveRecipeLocal, deleteRecipeLocal, getRecipeLocal, recipeStruct, dictionary, sanityRecipe }
