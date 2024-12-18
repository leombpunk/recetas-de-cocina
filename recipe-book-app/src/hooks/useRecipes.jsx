import { useEffect, useState } from "react"
import RecipesServices from "../services/Recipes"

const useRecipes = () => {
  const [reload, setReload] = useState(false)
  const [loading, setLoading] = useState(true)
  // const [notify, setNotify] = useState({})
  const [recipes, setRecipes] = useState([])
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [order, setOrder] = useState("ASC")
  const [sortBy, setSortBy] = useState("")
  const [errors, setErrors] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [totalRows, setTotalRows] = useState(0)

  const fetchRecipes = async () => {
    try {
      setLoading(true)
      const result = await RecipesServices.getRecipes(search, page, order, sortBy)
      // console.log(result)
      if (result?.status === 200) {
        // console.log(result.status)
        setRecipes(result.data.data.results)
        setTotalPages(result.data.data.total_pages)
        setTotalRows(result.data.data.total_rows)
      } else if (result?.status === 204) {
        //notify
        setRecipes([])
        setTotalPages(0)
        setTotalRows(0)
      }
      setTimeout(() => setLoading(false),1000) //trucazo
      // setLoading(false)
    } catch (error) {
      setErrors([error])
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRecipes()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, page, order, sortBy, reload])

  return {
    reload,
    loading,
    recipes,
    page,
    search,
    order,
    sortBy,
    totalPages,
    totalRows,
    errors,
    setPage,
    setSortBy,
    setSearch,
    setOrder,
    setReload,
  }
}

export default useRecipes
