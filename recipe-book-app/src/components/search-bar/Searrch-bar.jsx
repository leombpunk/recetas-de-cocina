import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const SearchBar = () => {
    return (
        <>
            <div className="flex basis-96 flex-col justify-center">
                <div className="background-searchbar bg-cover bg-no-repeat bg-center h-[32rem]">
                    {/*envolver el label y el input de buscar*/}
                    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                            <h2 className="mt-10 text-center text-5xl font-bold leading-9 tracking-tight text-gray-900">
                                Buscador de Recetas
                            </h2>
                        </div>

                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                            <form className="space-y-6" action="#" method="POST">
                                <div>
                                    <div className="relative mt-10 rounded-md shadow-sm">
                                        <input
                                        type="text"
                                        name="searchBar"
                                        id="searchBar"
                                        className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        placeholder="Buscar"
                                        />
                                        <button className="absolute inset-y-0 right-2 text-gray-500 flex items-center">
                                            <MagnifyingGlassIcon className="w-5 h-5 "/>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
           
        </>
    )
}

export default SearchBar