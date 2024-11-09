import { useEffect, useState } from "react"
import SaveRecipeServices from "../services/Saves"

const useSaves = () => {
  const [loading, setLoading] = useState(true)
  const [errors, setErrors] = useState([])
  const [save, setSave] = useState(false)

  const [fetch, setFetch] = useState(true)
  const [recipes, setRecipes] = useState([])
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [order, setOrder] = useState("ASC") //ordenar por fecha asc/desc
  const [totalPages, setTotalPages] = useState(0)
  const [totalRows, setTotalRows] = useState(0)
  const [reload, setReload] = useState(false)

  const fetchSaves = async () => {
    try {
      setFetch(true)
      const result = await SaveRecipeServices.getAllSavesRecipes(
        search,
        page,
        order
      )
      console.log(result)
      if (result.status === 200) {
        setRecipes(result.data.data.results)
        setTotalPages(result.data.data.total_pages)
        setTotalRows(result.data.data.total_rows)
      }
    } catch (error) {
      setFetch(false)
      setErrors([error])
    } finally {
      setFetch(false)
    }
  }

  const createSave = async (id) => {
    try {
      setLoading(true)
      const response = await SaveRecipeServices.postSaveRecipe(id)
      if (response.status === 200) {
        setSave(true)
      } else {
        setErrors([response])
      }
      setLoading(false)
    } catch (error) {
      setErrors([error])
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }
  const deleteSave = async (id) => {
    try {
      setLoading(true)
      const response = await SaveRecipeServices.deleteSaveRecipe(id)
      if (response.status === 200) {
        setSave(false)
      } else {
        setErrors([response])
      }
      setLoading(false)
    } catch (error) {
      setErrors([error])
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  const handleClickSave = (id) => {
    save ? deleteSave(id) : createSave(id)
  }

  useEffect(() => {
    fetchSaves()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload, search, page, order])

  return {
    loading,
    errors,
    save,
    fetch,
    search,
    page,
    recipes,
    totalPages,
    totalRows,
    setReload,
    setPage,
    setOrder,
    setSearch,
    setSave,
    handleClickSave,
  }
}

export default useSaves
