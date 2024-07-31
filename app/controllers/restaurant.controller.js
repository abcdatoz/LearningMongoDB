const db = require("../models")

const Restaurant = db.restaurantes


exports.create = (req,res) => {

    if(!req.body.nombre){
        res.status(400).send({ message: 'El nombre del restaurant '})
        return
    }


    const restaurant = new Restaurant({
        nombre:     req.body.nombre,
        direccion:  req.body.direccion ? req.body.direccion : "",
        descripcion:req.body.descripcion ? req.body.descripcion : "",
        domicilio:  req.body.domicilio ? req.body.domicilio : "",
        logo:       req.body.logo ? req.body.logo : ""
    })


    restaurant
        .save(restaurant)
        .then( data =>{ res.send(data) })
        .catch ( err => {
            res.status(500).send({
                message: err.message || "some error occurred while creating "
            })
        })

}


exports.findAll = (req, res) => {

    const  filterby =  req.query.filterby
    var condition = filterby ? { nombre: { $regex: new RegExp(filterby), $options: "i"} } : {}

    Restaurant
        .find(condition)    
        .then(data => { res.send(data)})
        .catch(err => {
            res.status(500).send({
                message: err.message || "some error occurred while retrieving restaurantes"
            })
        })
}

exports.findOne = (req, res) => {
    const id = req.params.id
    Restaurant
        .find(id)
        .then(data => {
            if(!data)
                res.status(404).send({ message: "No se encontro restaurant con el id " + id})
            else
                res.send(data)
        })
        .catch( err => {
            res.status(500).send({
                message: "Error retrieving Restauratn with id " + id
            })
        })
}

exports.update = (req, res) => {
    if(!req.body){
        return res.status(400).send({
            message: "los datos a actualizar no pueden ser vacios"
        })
    }

    const id = req.params.id
    
    Restaurant.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then( data => {
            if(!data){
                res.status(404).send({
                    message: `no se puede actualizar el restaurant con id = ${id}. quizas ese registro no fue encontrado!`
                })
            }
            else{
                res.send({
                    message: 'El registro fue actualizado exitosamente'
                })
            }
                
        })
        .catch(err => {
            res.status(500).send({
                message: "error updating restaurant with id = " + id
            })
        })
}

exports.delete = (req, res) => {
    const id = req.params.id

    Restaurant.findByIdAndRemove(id, { useFindAndModify: false })
        .then(data => {
            if (!data){
                res.status(404).send({
                    message: `no se puede eliminar el restaurant con id = ${id}. quizas no se encontro el documento`
                })                
            }
            else{
                res.send({
                    message: "El restaurant fue eliminado exitosamente"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "could not delete restaurant with id=" + id
            })
        })
}


exports.deleteAll = (req, res) => {
    Restaurant.deleteMany({})   
        .then(data => {
            res.send({
                message: `${data.deletedCount} restaurantes fueron eliminados exitosamente`
            })
        })
        .catch( err => {
            res.status(500).send({
                message: err.message || "some error occurred while removing all resataurants"
            })
        })
}