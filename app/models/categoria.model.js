module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            clave:{
                type: String,
                required: true
            },
            nombre:{
                type: String,
                required: true
            },            
            imagenUrl: String,            
            imagen: Buffer,            
            activo: Boolean,
            restaurantId: {
                type: mongoose.SchemaTypes.ObjectId,                
                ref: "restaurant",
                required: true
            },

            productos: [{
                type: mongoose.SchemaTypes.ObjectId,
                ref: "producto"
            }]



        }
    )

    const Categoria = mongoose.model("categoria", schema)

    return Categoria

}