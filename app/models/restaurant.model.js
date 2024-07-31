module.exports = mongoose =>{

    var schema = mongoose.Schema(
        {
            nombre: {
                type: String,
                required: true
            },
            descripcion: String,
            domicilio: String,
            logo: String
        }
    )

    const Restaurant = mongoose.model("restaurant", schema)

    return Restaurant
}