const mongoose =require ("mongoose")


const domicilioEntregaSchema = new mongoose.Schema(
    {
        calle: String,
        colonia: String,
        ciudad: String
    }
)

const clienteSchema =  new mongoose.Schema({
  rfc: {
    type: String,
    required: true,
    lowercase: true,
    minLength: 5
  },
  nombre: String,
  email: String,
  preferencias: [String],
  domicilioEntregas: domicilioEntregaSchema,
  credito: {
    type: Number,
    min: 0,
    max: 10000,
    default: 0
  },

  bestFriend: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Cliente"
  },

  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true
  }
})



clienteSchema.methods.sayHi =  function () {
    console.log(`hi im a cliente with rfc ${this.rfc}`)
}


clienteSchema.statics.findByName = function (name){
    return this.where ({nombre: new RegExp(name,'i')})
}


clienteSchema.query.byName = function (name){
    return this.where ({nombre: new RegExp(name,'i')})
}


clienteSchema.virtual ('namedEmail').get(function(){
    return `${this.nombre} <${this.email}>`
}) 

clienteSchema.pre('save', function (next){
    //this.updatedAt = Date.now()
    next()
})

clienteSchema.post('save', function (doc,next){
    doc.sayHi()
    next()
})
module.exports = mongoose.model("Cliente", clienteSchema)