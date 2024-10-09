import Usuario from "./usuario.js"
import Receta from "./receta.js"
import Archivo from "./archivos.js"
import Like from "./likes.js"
import Comentario from "./comentarios.js"
import SaveRecipe from "./saves.js"
import Respuesta from "./respuestas.js"

//relaciones entre tablas
Usuario.hasMany(Receta, { foreignKey: "idUsuario" }) //un usuario tiene muchas recetas
Usuario.hasMany(Archivo, { foreignKey: "idUsuario" }) //un usuario tiene muchos archivos
Usuario.hasMany(Like, { foreignKey: "idUsuario" }) // un usuario tiene muchos likes (puede dar muchos likes)
Usuario.hasMany(Comentario, { foreignKey: "idUsuario" }) //un usuario tiene muchos comentarios (puede escribir muchos comentarios)
Usuario.hasMany(SaveRecipe, { foreignKey: "idUsuario" }) //un usuario tiene muchas recetas guardadas
Usuario.hasMany(Respuesta, { foreignKey: "idUsuario", as: "respuestas" }) //un usuario tiene muchas respuesas (puede responder a muchos comentarios)
Usuario.hasMany(Respuesta, { foreignKey: "idUsuarioMension", as: "mensiones" })

Receta.belongsTo(Usuario, { foreignKey: "idUsuario" }) //una receta pertenece a un usuario
Receta.hasMany(Like, { foreignKey: "idReceta" }) //una receta tiene muchos likes
Receta.hasMany(Comentario, { foreignKey: "idReceta" }) //una receta tiene muchos comentarios
Receta.hasMany(SaveRecipe, { foreignKey: "idReceta" }) //una receta tiene muchos guardados (puede ser guardada muchas veces)

Archivo.belongsTo(Usuario, { foreignKey: "idUsuario" }) //un archivo pertenece a un usuario

Like.belongsTo(Usuario, { foreignKey: "idUsuario" }) //un like pertenece a un usuario
Like.belongsTo(Receta, { foreignKey: "idReceta" }) //un like pertenece a una receta

Comentario.belongsTo(Usuario, { foreignKey: "idUsuario" }) //un comentario pertenece a un usuario
Comentario.belongsTo(Receta, { foreignKey: "idReceta" }) //un comentario pertenece a una receta
Comentario.hasMany(Respuesta, { foreignKey: "idComentario" }) //un comentario puede tener muchas respuestas (raiz/padre)

SaveRecipe.belongsTo(Usuario, { foreignKey: "idUsuario" }) //un guardado pertenece a un usuario
SaveRecipe.belongsTo(Receta, { foreignKey: "idReceta" }) //un guardado pertenece a una receta

Respuesta.belongsTo(Usuario, { foreignKey: "idUsuario", as: "usuario", targetKey: "id" }) //una respuesta pertenece a un usuario
Respuesta.belongsTo(Usuario, { foreignKey: "idUsuarioMension", as: "mension", targetKey: "id" })
Respuesta.belongsTo(Comentario, { foreignKey: "idComentario" }) //una respuesta pertenece a un comentario

const models = {
  Usuario,
  Receta,
  Archivo,
  Like,
  Comentario,
  SaveRecipe,
  Respuesta,
}

export default models
