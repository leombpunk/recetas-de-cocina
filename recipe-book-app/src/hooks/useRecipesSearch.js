import { useEffect, useState } from "react"
import RecipesServices from "../services/Recipes"

//busca entre todas las recetas publicas
const useRecipesSearch = () => {
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState([])
  const [search, setSearch] = useState("")
  const [username, setUsername] = useState("")
  const [page, setPage] = useState(1)
  const [order, setOrder] = useState("ASC")
  const [totalPages, setTotalPages] = useState(0)
  const [totalRows, setTotalRows] = useState(0)
  const [recipes, setRecipes] = useState([])

  const fetchRecipesPublic = async () => {
    try {
      setLoading(true)
      const response = await RecipesServices.getRecipesPublic(
        search,
        page,
        order,
        username
      )
      if (response?.status === 200) {
        // console.log(response.status)
        setRecipes(response.data.data.results)
        setTotalPages(response.data.data.total_pages)
        setTotalRows(response.data.data.total_rows)
      } else if (response?.status === 204) {
        //notify
        setRecipes([])
        setTotalPages(0)
        setTotalRows(0)
      }
      setTimeout(() => setLoading(false), 500) //trucazo
      // setLoading(false)
    } catch (error) {
      console.log(error)
      setErrors([error])
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRecipesPublic()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, page, order, username])

  return {
    loading,
    errors,
    recipes,
    totalPages,
    totalRows,
    filters: {
      page,
      order,
      search,
      username,
      setOrder,
      setPage,
      setUsername,
      setSearch,
    },
  }
}

export default useRecipesSearch
