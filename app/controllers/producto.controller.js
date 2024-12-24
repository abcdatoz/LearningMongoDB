const db = require("../models")

const Producto = db.productos


exports.create = (req, res) => { 

    if ( !req.body.clave || !req.body.nombre || !req.body.categoriaId){
        res.status(400).send({ message: "No capturo todos los campos requeridos."})
        return
    }

    const producto = new Producto({
        clave: req.body.clave,
        nombre: req.body.nombre,
        imagen: req.body.imagen ? req.body.imagen : "",
        imagenUrl: req.body.imagenUrl ? req.body.imagenUrl : "",
        stock: req.body.stock ? req.body.stock : 0,
        existencias: req.body.existencias ? req.body.existencias : 0,
        activo: true,
        categoriaId: req.body.categoriaId
    })

    producto
        .save(producto)
        .then(data => { res.send(data) })
        .catch ( err => {
            res.status(500).send({
                message: err.message || "Error al crear el producto."
            })
        })
}


exports.findAll = (req,res) => {

    const filterBy = req.query.filterBy
    var condition = filterBy ? { nombre : { $regex: new RegExp(filterBy), $options: "i"}} : {}

    Producto
        .find(condition)
        .populate ('categoriaId')
        .then(data => { res.send(data) })
        .catch( err => {
            res.status(500).send({
                message: err.message || "Error al obtener los productos"
            })
        })
}


exports.findByCategoria = (req, res) => {
    const idCategoria =  req.params.id

    Producto
        .find({ categoriaId: id })
        .then(data => { res.send (data) })
        .catch( err => {
            res.status(500).send({
                message: err.message || "Error al obtener los productos de la categoria: " + id
            })
        })
}


exports.finOne = (req, res)  => {
    const id = req.params.id

    Producto
        .find({ _id: id})
        .then( data => { 
            
            if (!data){
                return res.status(404).send({
                    message: `El producto con id ${id} no fue localizado.`
                })                
            }

            res.send(data)
         })
        .catch ( err => {
            res.status(500).send({
                message: err.message || "Error al obtener producto con id " + id
            })
        })
}


exports.update = (req, res) => {

    if (!req.body){
        return res.status(400).send({ 
            message : "No capturo los campos requeridos."
        })
    }

    const id = req.params.id

    Producto    
        .findByIdAndUpdate(id, req.body, {useFindAndModify: false})
        .then (data => {

            if(!data){

                return res.status(404).send({
                    message: `No se pudo actualizar el producto con id ${id}. El registro no fue localizado.`
                })
            }

            res.send({ message: "El registro fue actualizado correctamente."})
        })
        .catch( err => {
            res.status(500).send({
                message: err.message || "Error al actualizar el producto"
            })
        })
}

exports.delete = (req, res) => {
    const id = req.params.id

    Producto
        .findByIdAndRemove(id, {useFindAndModify: false})
        .then(data =>{

            if (!data){
                return res.statu(404).send({
                    message: `El producto con id ${id} no fue localizado.`
                })
            }

            res.send({ message: "El registro se elimino correctamente." })
        })
        .catch( err => {
            res.status(500).send({
                message: err.message || "Error al eliminar el producto"
            })
        })

}