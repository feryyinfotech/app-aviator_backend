const express = require('express')
const app = express()
require('dotenv').config()

// middeleware to pass
app.use(express.json())
// app.use(app.router);
// routes.initialize(app);

const PORT = process.env.PORT || 4000

// import routes
const todoRoutes = require('./routes/todos')
//mounting
app.use("/api/v1",todoRoutes)


app.listen(PORT,()=>{
    console.log("App start at 3000");
})

// Connect to the database
const dbConnect = require('./config/database')
dbConnect()

// const createAllCountry = require('./controller/CST/createAllCountry')
// createAllCountry()
//default route

const createAllState = require('./controller/CST/createAllCountry')

app.get("/",(req,res)=>{
    res.send(`<h1>This is run at ${PORT}</h1>`)
})