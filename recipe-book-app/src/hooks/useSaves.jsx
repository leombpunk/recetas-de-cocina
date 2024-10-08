import { useState } from "react"
import SaveRecipeServices from "../services/Saves"

const useSaves = (id) => {
  const [loading, setLoading] = useState(true)
  const [errors, setErrors] = useState([])
  const [save, setSave] = useState(false)

  const createSave = async () => {
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
  const deleteSave = async () => {
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

  const handleClickSave = () => {
    save ? deleteSave() : createSave()
  }

  return {
    loading,
    errors,
    save,
    setSave,
    handleClickSave,
  }
}

export default useSaves
