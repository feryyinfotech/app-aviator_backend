// sara ka sara code 
// step 1  >> Create a folder
// step 2 >> npm init -y
// step 3 >> npm i express
// step 4 >> create a server.js
// step 5 >> start server >> node server.js

const express = require('express')
const app = express()


// it use in post and put request  <<<<--- this is body parser
const bodyParser = require('body-parser')
app.use(bodyParser.json())

app.listen(3000,()=>{
    console.log("Server started at port no 3000")
})

app.get('/',(req,res)=>{
    res.send("Hellow anand kumar verma , ji lo apni jindgi")
})

app.post('/api/cars',(req,res)=>{
    const {name,brand} = req.body;
    
    console.log(name,brand)
    res.send("Car submitted successfuly")
})

const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/myDatabase',{
    useNewurlparser:true,
    useUnifiedTopology:true
})
.then(()=>{console.log("Connection Successfull")})
.catch((e)=>{console.log(e,"This is error << Error aa rhi hai anand ji")})