import { Outlet } from "react-router-dom"
import Footer from "./footer/Footer"
import Header2 from "./header/Header2"

const AppContainer = () => {
    return (
        <>
            <Header2 />
            <Outlet />
            <Footer />   
        </>
    )
}

export default AppContainer