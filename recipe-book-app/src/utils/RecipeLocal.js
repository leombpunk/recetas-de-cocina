const recipeStruct = {
  id: 26,
  titulo: "",
  imagen: "",
  descripcion: "",
  comensales: "",
  duracion: "",
  ingredientes: [{ orden: 0, ingrediente: "", cantidad: "" }],
  pasos: [{ orden: 0, paso: "", imagen: "" }],
  checked: 0,
  visibilidad: 0,
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

export { saveRecipeLocal, deleteRecipeLocal, getRecipeLocal, recipeStruct }
