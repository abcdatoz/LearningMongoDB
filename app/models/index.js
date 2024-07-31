const dbConfig = require("../config/db.config")
const mongoose = require("mongoose")

mongoose.Promise = global.Promise

const db = {}

db.mongoose = mongoose
db.url = dbConfig.url

db.restaurantes = require("./restaurant.model")(mongoose)
db.categorias = require("./categoria.model")(mongoose)
db.productos = require("./producto.model")(mongoose)

module.exports =db