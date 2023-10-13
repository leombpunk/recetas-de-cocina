const urlAPI = 'http://localhost:3001';

const RoutesAPI = {
    login: `${urlAPI}/login`,
    register: `${urlAPI}/registro`,
    profile: `${urlAPI}/usuarios`,
    recipes: `${urlAPI}/recetas`,
    // recipe: `${urlAPI}/receta`, //no existe este endpoint
}

export { RoutesAPI };