const mongoose = require('mongoose')
const Cliente = require("./app/models/Cliente")

mongoose.connect("mongodb://localhost:27017/pilot")


run()

async function run(){

    // const cliente = new Cliente({rfc:'abc', nombre: 'peter park'})
    // cliente.save().then(() => { console.log(' a client was created') })    
    // console.log(cliente)


    //const cliente = await Cliente.create({rfc: 'herl2340', nombre:'rey'})

    try{
        
        const cliente = await Cliente.create({
            rfc: 'herl790504',
            nombre: 'rey    ',            
            email: 'sky@fall.wst',
            preferencias: ['verduras','candys'],
            domicilioEntregas: {
                calle:'insurgentes 28',
                colonia:'centro',
                ciudad:'rafluver'
            }

        })

        await cliente.save()

        console.log('cliente', cliente)


        /*
            const cliente = await Cliente.find("66a7c8822633da69b912ee51")
            const cliente = await Cliente.find({rfc: 'helr790504'})
            const cliente = await Cliente.findOne({rfc: 'helr790504'})
            const cliente = await Cliente.exist({rfc: 'helr790504'})
            const cliente = await Cliente.deleteOne({rfc: 'helr790504'})
            const cliente = await Cliente.upateOne({rfc: 'helr790504'})
            const cliente = await Cliente.upateMany({rfc: 'helr790504'})
            
            const cliente = await Cliente.where("rfc").equals("herl")
            const cliente = await Cliente.where("credito")
                                    .gt("5000")
                                    .limit(10)
                                    .selec("nombre")
                cliente[0].bestFriend = "669adeeec81eb5d4143443af"
                await cliente[0].save()


            */
        
        

    }catch(e){
        console.log(e.message)
    }
}







// const cliente = new Cliente({rfc:'aksdj12309', nombre: 'cliente 1', direccion:'calle x', whatsapp:'555-45-45554'})
// cliente.save().then(() => { console.log(' a client was created') })




//this works
// const Cat = mongoose.model('Cat', {name: String, age:Number })
// const kitty = new Cat({name:'narutin', age:19})
// kitty.save().then(() => console.log('cague bunzen not jutsu'))