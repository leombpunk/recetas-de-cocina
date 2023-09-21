import { Outlet } from "react-router-dom"
import Footer from "./footer/Footer"
import Header2 from "./header/Header2"
import RecipeCard from "./recipe-card/RecipeCard"
import SearchBar from "./search-bar/Searrch-bar"

const AppContainer = () => {
    return (
        <>
            <Header2 />
            {/* <SearchBar />
            <RecipeCard />       */}
            <Outlet />
            <Footer />   
        </>
    )
}

export default AppContainer