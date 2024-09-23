import { useEffect, useState } from "react"
import RecipesServices from "../services/Recipes"

const useRecipes = () => {
  const [loading, setLoading] = useState(false)
  const [notify, setNotify] = useState({})
  const [recipes, setRecipes] = useState([])
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [order, setOrder] = useState("ASC")
  const [errors, setErrors] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [totalRows, setTotalRows] = useState(0)

  const fetchRecipes = async () => {
    try {
      setLoading(true)
      const result = await RecipesServices.getRecipes(search, page, order)
      console.log(result)
      if (result?.status === 200) {
        // console.log(result.status)
        setRecipes(result.data.data.results)
        setTotalPages(result.data.data.total_pages)
        setTotalRows(result.data.data.total_rows)
      } else if (result?.status === 204) {
        //notify
      }
      setLoading(false)
    } catch (error) {
      setErrors([error])
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRecipes()
  }, [search, page, order])

  return {
    loading,
    recipes,
    page,
    search,
    order,
    totalPages,
    totalRows,
    setPage,
    setSearch,
    setOrder,
  }
}

export default useRecipes
