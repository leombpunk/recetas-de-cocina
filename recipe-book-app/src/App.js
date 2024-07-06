import './App.css'
import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter, Route, Routes } from  'react-router-dom'
import AppContainer from './components/AppContainer'
import NavigationRoutes from './utils/NavigationRoutes'
import { UserProvider } from './providers/UserProvider'
import { NotificationProvider } from './providers/NotificationProvider'
import { HomePage, NotFoundPage, LoginPage, ProfilePage, RecipePage, RegisterPage, SearchPage } from './pages/index'

const App = () => {
  return (
    <UserProvider>
      <NotificationProvider>
        <BrowserRouter>
          <Routes>
            <Route path={NavigationRoutes.Login} element={<LoginPage />} />
            <Route path={NavigationRoutes.Register} element={<RegisterPage />} />
            <Route element={<AppContainer />}>
              <Route path={NavigationRoutes.Home} element={<HomePage />} />
              <Route path={NavigationRoutes.Profile} element={<ProfilePage />} />
              <Route path={NavigationRoutes.Recipe} element={<RecipePage />} />
              <Route path={NavigationRoutes.Search} element={<SearchPage />} />
              <Route path={"*"} element={<NotFoundPage/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </NotificationProvider>
    </UserProvider>
  )
}

export default App