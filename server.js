require ('dotenv').config() //will load all the environment from the env

const express = require('express') //pull the express lib
const app = express () //configure server
const mongoose = require (`mongoose`) //connect to mongo database - this is backtick, no '' in database

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true }) //connect to database "subscriber is the database name"
const db = mongoose.connection

db.on ('error', (error) => console.error (error)) //will show if there's error 
db.once ('open', () => 
    console.log ('Connected to the Database')
) 

app.use(express.json()) //will allow us to use middleware, will accept json as a body in a git body ...

const subscribersRouter = require ('./routes/subscribers') // route all subscriber information
app.use('/subscribers', subscribersRouter) // will pass every query 


app.listen(3000, () => console.log ('server started')) //port 