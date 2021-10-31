require("dotenv").config();
const express = require('express')
const app = express()
app.use(express.json())

/*
mongoose.connect(process.env.DB_CONNECTION, (error)=>{
    if (error){
        console.log(error)
    }
    else{
        console.log("Mongo connection success!!")
    }
*/
const mongoose = require('mongoose')
const {Schema} = mongoose
mongoose.connect(process.env.DB_CONNECTION)
    .then(()=>{
        console.log("Mongo connection success!!")
    }).catch((error)=>{
        console.log("Mango connection error: ", error)
    })

const userSchema = new Schema({
    email: String,
    password: String,
})

const User = mongoose.model('User', userSchema)


/*app.get('/register', (req,res)=> {
    const {email, password } = req.query
    const existingUser = User.findOne({email}).exec()
    console.log({existingUser})
    existingUser.then((user)=> {
        console.log({user})
    })
    res.send("t")
})*/

app.post('/register',async (req,res)=> {
try{
    const {email, password } = req.query
    const existingUser = await User.findOne({email}).exec()
    if (existingUser){
        res.status(400).send("User Already Exists")
        return;
    }
    const newUser= await User.create({email, password})
    res.status(201).send("User creat")
}
catch(error){
    console.log("Error: ", error)
}
})



const port = process.env.PORT
const server = app.listen(port, ()=>{
    console.log("start port: "+ port)
})

/*console.log("server: ", server)*/

console.log(process.env)