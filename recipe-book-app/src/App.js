// import logo from './logo.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from  'react-router-dom'
import AppContainer from './components/AppContainer'
import { HomePage } from './pages/index'
import NavigationRoutes from './utils/NavigationRoutes'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppContainer />}>
          <Route path={NavigationRoutes.Home} element={<HomePage />} ></Route>
        </Route>
        {/* <Route path={"*"} element={<NotFound/>}/> */}
      </Routes>
      {/* <AppContainer /> */}
    </BrowserRouter>
  )
}

export default App