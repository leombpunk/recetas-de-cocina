const Footer = () => {
    return (
        <>
            <footer>
                <div className=" bg-orange-500">
                    <div className="max-w-2xl mx-auto text-black py-10">
                        <div className="text-center">
                            <h3 className="text-3xl mb-3">Descargate la App</h3>
                            <p> Lleva tus recetas donde quieras.</p>
                            <div className="flex justify-center my-10">
                                <div className="flex items-center border border-black  rounded-lg px-4 py-2 w-52 mx-2">
                                    <img src="https://cdn-icons-png.flaticon.com/512/888/888857.png" className="w-7 md:w-8" alt="descarga la app desde la play store"/>
                                    <div className="text-left ml-3">
                                        <p className='text-xs text-gray-900'>Descarga</p>
                                        <p className="text-sm md:text-base"> Google Play Store </p>
                                    </div>
                                </div>
                                <div className="flex items-center border border-black rounded-lg px-4 py-2 w-52 mx-2">
                                    <img src="https://cdn-icons-png.flaticon.com/512/888/888841.png" className="w-7 md:w-8" alt="descarga la app desde la apple store"/>
                                    <div className="text-left ml-3">
                                        <p className='text-xs text-gray-900'>Descarga</p>
                                        <p className="text-sm md:text-base"> Apple Store </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-28 flex flex-col md:flex-row md:justify-between items-center text-sm text-gray-800">
                            <p className="order-2 md:order-1 mt-8 md:mt-0"> &copy; CookingBook App, 2023. </p>
                            <div className="order-1 md:order-2">
                                <span className="px-2">Acerca de</span>
                                <span className="px-2 border-l border-black">Contactanos</span>
                                <span className="px-2 border-l border-black">Políticas de privacidad</span>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer