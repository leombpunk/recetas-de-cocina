import Usuario from "./usuario.js"
import Receta from "./receta.js"
import Archivo from "./archivos.js"
import Like from "./likes.js"
import Comentario from "./coments.js"

//relaciones entre tablas
Usuario.hasMany(Receta, { foreignKey: "idUsuario" }) //un usuario tiene muchas recetas
Usuario.hasMany(Archivo, { foreignKey: "idUsuario" }) //un usuario tiene muchos archivos
Usuario.hasMany(Like, { foreignKey: "idUsuario" }) // un usuario tiene muchos likes (puede dar muchos likes)
Usuario.hasMany(Comentario, { foreignKey: "idUsuario" }) //un usuario tiene muchos comentarios (puede escribir muchos comentarios)

Receta.belongsTo(Usuario, { foreignKey: "idUsuario" }) //una receta pertenece a un usuario
Receta.hasMany(Like, { foreignKey: "idReceta" }) //una receta tiene muchos likes
Receta.hasMany(Comentario, { foreignKey: "idReceta" }) //una receta tiene muchos comentarios

Archivo.belongsTo(Usuario, { foreignKey: "idUsuario" }) //un archivo pertenece a un usuario

Like.belongsTo(Usuario, { foreignKey: "idUsuario" }) //un like pertenece a un usuario
Like.belongsTo(Receta, { foreignKey: "idReceta" }) //un like pertenece a una receta

Comentario.belongsTo(Usuario, { foreignKey: "idUsuario" }) //un comentario pertenece a un usuario
Comentario.belongsTo(Receta, { foreignKey: "idReceta" }) //un comentario pertenece a una receta

const models = { Usuario, Receta, Archivo, Like, Comentario }

export default models
