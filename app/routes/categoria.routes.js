module.exports = app => { 

    const categorias = require("../controllers/categoria.controller")

    var router =  require("express").Router()

    router.get("/", categorias.findAll)    
    router.get("/:id", categorias.findOne)    
    router.get("/byrestaurant/:id", categorias.findByRestaurant)
    router.post("/", categorias.create)
    router.put("/:id", categorias.update)
    router.delete("/:id", categorias.delete)
  

    app.use("/api/categorias", router)
}



