module.exports = app => {

    const restaurants = require("../controllers/restaurant.controller")

    var router = require("express").Router()

    router.get("/", restaurants.findAll)
    router.get("/:id", restaurants.findOne)
    
    router.post("/", restaurants.create)
    router.put("/:id", restaurants.update)
    router.delete("/:id", restaurants.delete)
    router.delete("/", restaurants.deleteAll)

    app.use("/api/restaurants", router)
}
 