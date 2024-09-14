const urlAPI = 'http://localhost:3001'
// const urlAPI = ''

const RoutesAPI = {
    auth: `${urlAPI}/auth`,
    profile: `${urlAPI}/usuarios`,
    recipes: `${urlAPI}/recetas`,
    images: `${urlAPI}/imagenes`,
    staticFiles: `${urlAPI}/static`,
}

export { RoutesAPI };