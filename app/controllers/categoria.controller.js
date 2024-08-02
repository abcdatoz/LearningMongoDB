const db = require("../models")

const Categoria =  db.categorias


exports.create =  (req,res) => {
    
    if (!req.body.clave || !req.body.nombre || !req.body.restaurantId){
        res.status(400).send({message:" no capturo todos los campos requeridos"})
        return
    }

    const categoria = new Categoria({
        clave : req.body.clave,
        nombre: req.body.nombre,
        imagen: req.body.imagen ? req.body.imagen : "",
        imagenUrl: req.body.imagenUrl ? req.body.imagenUrl : "",
        activo: true,
        restaurantId: req.body.restaurantId        
    })

    categoria
        .save(categoria)
        .then( data => { res.send(data) })
        .catch ( err => {
            res.status(500).send({
                message: err.message || "Error al registrar la categoria"
            })
        })
}


exports.findAll = ( req,res) => {
    const filterBy =  req.query.filterBy
    var condition = filterBy ? { nombre: { $regex: new RegExp(filterBy), $options: "i" }} : {}

    Categoria
        .find(condition)
        .then( data => { res.send(data)})
        .catch ( err => {
            res.status(500).send({
                message: err.message || "Error al obtener las categorias"
            })
        })
}

exports.findByRestaurant = (req, res) =>{
    const idRest = req.params.id

    Categoria
        .find({ restaurantId: idRest})
        .then(data => { res.send(data) })
        .catch( err => {
            res.status(500).send({
                message: err.message || "Error al obtener las categorias del restId " + idRest
            })
        })

}

exports.findOne = (req, res) => {
    const id = req.params.id

    Categoria
        .find({_id: id})
        .populate('productos')
        .then (data =>{
            
            if(!data){
                
                return res.status(404).send({
                    message: `La categoria con id  ${id} no fue localizada`
                })

            }


            res.send(data)

        })
        .catch( err => {
            res.status(500).send({
                message: err.message || "Error al obtener la categoria con id " + id
            })
        })
}


exports.update = (req, res) => {

    if (!req.body){
        return res.status(400).send({
            message: "los datos a actualizar no fueron enviados"
        })
    }

    const id = req.params.id 

    Categoria
        .findByIdAndUpdate(id, req.body, {useFindAndModify: false })
        .then (data =>{

            if (!data){

                return res.stastus(404).send({
                    message: `No se pudo actualizar el registro con id ${id}. Lo mas probable es que el registro no fue localizado `
                })               
                
            }

            res.send({message: "El registro fue actualizado exitosamente"})
        })
        .catch( err => {
            res.status(500).send({
                message: err.message ||  "error al actualizar el registro con id " + id
            })
        })
}

exports.delete = (req,res) => { 
    const id = req.params.id 

    Categoria
        .findByIdAndRemove(id, {useFindAndModify: false})
        .then( data => {

            if(!data){

                return res.status(404).send({
                    message: `no se pudo eliminar el registro con id ${id}, quizás no fue localizado en la bd`
                })               
                
            }

            res.send({message: "El registro se elimino correctamente"})

        })
        .catch(err => {
            res.status(500).send({
                message: err.message ||  "Error al eliminar el registro con id " + id
            })
        })
}