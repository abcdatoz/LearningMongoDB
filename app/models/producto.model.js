module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            clave: {
                type: String,
                required: true
            },
            nombre:{
                type: String,
                required: true
            },
            imagen: Buffer,
            imagenUrl: String,
            activo: Boolean,
            stock: {
                type: Number,
                min: 0,
                default: 0
            },
            existencias: {
                type: Number,
                min:0,
                default:0
            },
            categoriaId:{
                type: mongoose.SchemaTypes.ObjectId,
                ref: "categoria"
            }
        }
    )

    const Producto =  mongoose.model('producto', schema)
    
    return Producto
}