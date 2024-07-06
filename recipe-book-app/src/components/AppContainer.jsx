import { Outlet } from "react-router-dom"
import Footer from "./footer/Footer"
import Header from "./header/Header"

const AppContainer = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />   
        </>
    )
}

export default AppContainer