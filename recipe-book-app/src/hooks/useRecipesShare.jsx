import { useForm } from "react-hook-form"

const useRecipesShare = ({recipes}) => {
  const {register, handleSubmit, setValue} = useForm({values: recipes})

  const updateRecipesShare = async () => {}

  return {
    updateRecipesShare
  }
}

export default useRecipesShare