const express = require('express')
const subscriber = require('../models/subscriber')
const router = express.Router() //get the router from express
const Subscriber = require ('../models/subscriber')
//get all 
router.get('/', async (req,res) =>{
  res.send('hello world')  
})
//get one : = means parameter
router.get('/:id', (req,res) =>{
    res.send(req.params.id) 
})
//create one - not creating general route
router.post('/', (req,res) =>{
    
})
//update one you will patch/update only one user
router.patch('/:id', (req,res) =>{
    
})
//delete one
router.delete('/:id', (req,res) =>{
    
})

//middleware 

async function getSubscriber(req,res,next){
    let subscriber 
    try {
        subscriber = await Subscriber.findById(req.params.id)  
        if(subscriber == null){
            return res.status(404).json ({message:'cannot find subscriber'}) //500 means there's an error in the server
        }
    } catch (err) { 
        res.status(500).json ({message:err.message}) //500 means there's an error in the server
    }
}
//res.subscriber = subscriber
//next() // will allow you to moved to the next 
//module.exports = router