import { Link } from "react-router-dom";
import NavigationRoutes from "../utils/NavigationRoutes";
const NotFoundPage = () => {
    return (
    <>
      <main className="grid min-h-full place-items-center bg-orange-300 px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-3xl font-semibold text-gray-900">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Página no encontrada</h1>
          <p className="mt-6 text-2x1 leading-7 text-gray-800">Que ha pachao!</p>
          <img className="mt-3" alt="error-404-page-not-found" src={require("../assets/images/this-is-fine-404.gif")} />
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to={NavigationRoutes.Home}
              className="rounded-md bg-orange-600 px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
            >
              Volver al inicio
            </Link>
            {/* <a href="#asd" className="text-sm font-semibold text-gray-900">
              Contact support <span aria-hidden="true">&rarr;</span>
            </a> */}
          </div>
        </div>
      </main>
    </>
  )
}

export default NotFoundPage;