module.exports = app => {

    const productos = require("../controllers/producto.controller")
    var router = require("express").Router()

    router.get("/", productos.findAll)
    router.get("/:id", productos.finOne)
    router.get("/bycategoria/:id", productos.findByCategoria)
    router.post("/", productos.create)
    router.put("/:id", productos.update)
    router.delete("/:id", productos.delete)

    app.use("/api/productos/", router)
}