import "./App.css"
import "react-toastify/dist/ReactToastify.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import AppContainer from "./components/AppContainer"
import NavigationRoutes from "./utils/NavigationRoutes"
import { UserProvider } from "./providers/UserProvider"
import { NotificationProvider } from "./providers/NotificationProvider"
import {
  HomePage,
  NotFoundPage,
  LoginPage,
  ProfilePage,
  RecipePage,
  RecipesPage,
  RegisterPage,
  SearchPage,
  RecipePublicPage,
} from "./pages/index"
import ProtectedRoutes from "./components/ProtectedRoutes"
//iconos fontawesome
import { library } from "@fortawesome/fontawesome-svg-core"
import {
  faFacebook,
  faWhatsapp,
  faInstagram,
  faXTwitter,
  faLinkedin,
  faReddit,
  faTelegram,
} from "@fortawesome/free-brands-svg-icons"
import { faEnvelope, faLink } from "@fortawesome/free-solid-svg-icons"

library.add(faFacebook, faWhatsapp, faInstagram, faXTwitter, faEnvelope, faLink, faLinkedin, faReddit, faTelegram)

const App = () => {
  return (
    <UserProvider>
      <NotificationProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<ProtectedRoutes />}>
              <Route path={NavigationRoutes.Login} element={<LoginPage />} />
              <Route
                path={NavigationRoutes.Register}
                element={<RegisterPage />}
              />
              <Route element={<AppContainer />}>
                <Route path={NavigationRoutes.Home} element={<HomePage />} />
                <Route
                  path={NavigationRoutes.Profile}
                  element={<ProfilePage />}
                />
                <Route
                  path={NavigationRoutes.RecipeCreate}
                  element={<RecipePage />}
                />
                <Route
                  path={NavigationRoutes.Recipe}
                  element={<RecipePage />}
                />
                <Route
                  path={NavigationRoutes.Recipes}
                  element={<RecipesPage />}
                />
                <Route
                  path={NavigationRoutes.Search}
                  element={<SearchPage />}
                />
                <Route
                  path={NavigationRoutes.SearchRecipe}
                  element={<RecipePublicPage />}
                />
                <Route path={"*"} element={<NotFoundPage />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </NotificationProvider>
    </UserProvider>
  )
}

export default App
