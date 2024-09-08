import { useEffect, useState } from "react"

const useRecipes = () => {
  const [recipes, setRecipes] = useState(null)
  const [search, setSearch] = useState(null)
  const [page, setPage] = useState(1)
  const [order, setOrder] = useState(null)

  const fetchRecipes = async () => {}

  useEffect(() => {
    fetchRecipes()
  }, [search, page, order])

  return {
    recipes,
    page,
    search,
    order,
    setPage,
    setSearch,
    setOrder,
  }
}

export default useRecipes
