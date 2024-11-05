const urlAPI = 'http://localhost:3001'
// const urlAPI = '' //url de producción

const RoutesAPI = {
    auth: `${urlAPI}/auth`,
    profile: `${urlAPI}/usuarios`,
    recipes: `${urlAPI}/recetas`,
    images: `${urlAPI}/imagenes`,
    // staticFiles: `${urlAPI}/static`,
    // avatarFiles: `${urlAPI}/avatar`,
    likes: `${urlAPI}/likes`,
    saves: `${urlAPI}/guardadas`,
    coments: `${urlAPI}/comentarios`,
    recipesPublic: `${urlAPI}/recetas/public`,
    public: `${urlAPI}/public/users`,
}

export { RoutesAPI };