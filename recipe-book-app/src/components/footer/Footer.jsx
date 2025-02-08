const Footer = () => {
    return (
        <>
            <footer>
                <div className=" bg-orange-700">
                    <div className="max-w-4xl mx-auto text-white font-semibold py-10">
                        <div className="text-center">
                            <h3 className="text-4xl mb-3">Descargate la App</h3>
                            <p className="text-lg"> Lleva tus recetas donde quieras.</p>
                            <div className="flex justify-center my-10">
                                <a href="#app" className="flex items-center border border-gray-100 rounded-lg px-4 py-2 w-60 mx-2 bg-orange-600 shadow-black/70 hover:shadow-lg">
                                    <img src="https://cdn-icons-png.flaticon.com/512/888/888857.png" className="w-7 md:w-10" alt="descarga la app desde la play store"/>
                                    <div className="text-left ml-3">
                                        <p className='text-xs text-gray-100'>Descarga</p>
                                        <p className="text-sm md:text-lg"> Google Play Store </p>
                                    </div>
                                </a>
                                <a href="#app" className="flex items-center border border-gray-100 rounded-lg px-4 py-2 w-60 mx-2 bg-orange-600 shadow-black/70 hover:shadow-lg">
                                    <img src="https://cdn-icons-png.flaticon.com/512/888/888841.png" className="w-7 md:w-10" alt="descarga la app desde la apple store"/>
                                    <div className="text-left ml-3">
                                        <p className='text-xs text-gray-100'>Descarga</p>
                                        <p className="text-sm md:text-lg"> Apple Store </p>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div className="mt-20 flex flex-col md:flex-row md:justify-between items-center text-base text-gray-200">
                            <p className="order-2 md:order-1 mt-8 md:mt-0 px-2">Recipe App</p>
                            <div className="order-1 md:order-2">
                                <a href="#about" className="px-2 hover:underline">Acerca de</a>
                                <a href="#contact" className="px-2 hover:underline border-l border-white">Contactanos</a>
                                <a href="#policy" className="px-2 hover:underline border-l border-white">Políticas de privacidad</a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer