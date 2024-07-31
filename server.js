const express = require ("express")
const cors = require("cors")


require('dotenv').config()

const app = express()

var corsOptions = {
    origin: "http://localhost:8090"
}


app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended: true}))



const db = require("./app/models")
db.mongoose
    .connect(db.url,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to de mongo database ;D")
    })
    .catch(err => {
        console.log("something went wrong!!",err)
        process.exit()
    })





app.get("/", (req,res) =>{
    res.json({message:"babe i wasnt there!!"})
})


//routes
require("./app/routes/restaurant.routes")(app)



const PORT = process.env.PORT || 8088
app.listen(PORT,() => {
    console.log(`server is running on port ${PORT}...`)
})