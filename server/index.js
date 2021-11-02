require("dotenv").config();
const jwt = require('jsonwebtoken')
const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())


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
const { Schema } = mongoose
mongoose.connect(process.env.DB_CONNECTION)
    .then(() => {
        console.log("Mongo connection success!!")
    }).catch((error) => {
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

app.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body
        console.log("in")
        console.log(email)
        console.log(password)

        if (email == null || password == null) {
            console.log("error")
            res.status(400).send("Missing data")
            return res;
        }
        if (password.length < 8 || email.length < 6 || email.indexOf('@') == -1 || email.indexOf('.') == -1) {
            console.log("error")
            res.status(400).send("Missing data")
            return res;
        }

        const existingUser = await User.findOne({ email }).exec()
        console.log({existingUser})
        if (existingUser) {
            res.status(400).send("User Already Exists")
            console.log("00000000000000000000000000000000")
            return res;
        }
        console.log("ok!!!")
        res.json({ token: jwt.sign({ email }, process.env.SECRET, { expiresIn: "2h" }) })
        const newUser = await User.create({ email, password })
        return res;
    }

catch (error) {
    console.log("Error: ", error)
    res.status(500).send(error)
}
})

app.post('/login', async (req, res) => {
    console.log("login", req.body)
    try {
        const { email, password } = req.body
        const existingUser = await User.findOne({ email, password }).exec()
        if (!existingUser) {
            res.status(400).send("User or Password Invalid")
            return;
        }

        res.json({ token: jwt.sign({ email }, process.env.SECRET, { expiresIn: "2h" }) })

    } catch (error) {
        console.log("Error: ", error)
        res.status(500).send(error)
    }
})

const port = process.env.PORT
const server = app.listen(port, () => {
    console.log("start port: " + port)
})

/*console.log("server: ", server)*/