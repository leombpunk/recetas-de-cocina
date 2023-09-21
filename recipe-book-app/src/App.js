// import logo from './logo.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from  'react-router-dom'
import AppContainer from './components/AppContainer'
import NavigationRoutes from './utils/NavigationRoutes'
import { HomePage, NotFoundPage, LoginPage, ProfilePage, RecipePage, RegisterPage } from './pages/index'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={NavigationRoutes.Login} element={<LoginPage />} ></Route>
        <Route path={NavigationRoutes.Register} element={<RegisterPage />} ></Route>
        <Route element={<AppContainer />}>
          <Route path={NavigationRoutes.Home} element={<HomePage />} ></Route>
          <Route path={NavigationRoutes.Profile} element={<ProfilePage />} ></Route>
          <Route path={NavigationRoutes.Recipe} element={<RecipePage />} ></Route>
          <Route path={"*"} element={<NotFoundPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App