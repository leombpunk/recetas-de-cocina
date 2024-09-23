import Loader from "../../components/loader/Loader"
import RecipeCard from "./RecipeCard"
import Pagination from "../pagination/Pagination"
import useRecipes from "../../hooks/useRecipes"
import NavigationRoutes from "../../utils/NavigationRoutes"

const RecipeContainer = ({ title }) => {
  const { recipes, loading, page, totalPages, totalRows, setPage } = useRecipes()
  //recibe una lista de recetas
  //recibe paginacion
  //recibe filtros
  //contiene recipecard
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className='bg-orange-300'>
          <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
            <h2 className='sticky top-0 text-3xl font-bold tracking-tight text-gray-900 z-10 bg-orange-300 py-4'>
              {title}
            </h2>
            <div className='mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8'>
              {recipes.map((recipe, index) => (
                <RecipeCard
                  recipe={recipe}
                  key={`recipe-card-${index}`}
                  navigation={NavigationRoutes.Recipe}
                />
              ))}
            </div>
            <Pagination page={page} totalPages={totalPages} totalRows={totalRows} setPage={setPage} />
          </div>
        </div>
      )}{" "}
    </>
  )
}

export default RecipeContainer
