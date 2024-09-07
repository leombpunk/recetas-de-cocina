const recipeStruct = {
    id:26,
    titulo: "",
    imagen: "",
    descripcion: "",
    comensales: "",
    duracion: "",
    ingredientes: [{ orden: 0, ingrediente: "", cantidad: "" }],
    pasos: [{ orden: 0, paso: "", imagen: "" }],
}

//guarda en localstorage
const saveRecipeLocal = (recipe) => {
  const data = JSON.stringify(recipe)
  localStorage.setItem("RecipeApp", data)
}

const getRecipeLocal = () => {
  return localStorage.getItem("RecipeApp")
}

//elimina de localstorage
const deleteRecipeLocal = () => {
  localStorage.removeItem("RecipeApp")
}

export { saveRecipeLocal, deleteRecipeLocal, getRecipeLocal, recipeStruct }
