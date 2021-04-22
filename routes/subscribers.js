const express = require('express')
const router = express.Router() //get the router from express
const Subscriber = require ('../models/subscriber')

//get all 

router.get('/', async (req,res) =>{
  try 
    {
      const subscribers = await Subscriber.find()  //this will find  all the subscribers, not synchronous so have to put await on it 
      res.json(subscribers) //if successful
    } 
  catch (err) 
    {
      res.status(500).json ({message:err.message}) //500 means there's an error in the server
    }
})



//get one : = means parameter
router.get('/:id', getSubscriber, (req,res) => //getSubscriber is used as a middleware
{ 
    res.send(req.subscriber.name) 
})



//create one - not creating general route
router.post('/', async (req,res) =>
{
   const subscriber = new Subscriber
   ({
    name: req.body.name, 
    subscribedToChannel: req.body.subscribedToChannel
    })
    try 
        {
        const newSubscribers = await subscriber.save()  //this will find  all the subscribers, not synchronous so have to put await on it 
        res.status(201).json(newSubscribers) //201 means successful
        } 
    catch (err) 
        {
        res.status(400).json ({message:err.message}) //400 means unsuccessful, as user gave bad data 
        }    
})



//update one --- you will patch/update only one user
router.patch('/:id', getSubscriber, async (req,res) =>{
   if (req.body.name != null){
       res.subscriber.name = req.body.name
   } 
   if (req.body.subscribedToChannel != null){
    res.subscriber.subscribedToChannel = req.body.subscribedToChannel
}
try{
    const updatedSubscriber = await res.subscriber.save()
    res.json (updatedSubscriber) ///this will be the reply 
}catch (err) {
    res.status(400).json({message: err.message})
}
})





//delete one
router.delete('/:id', getSubscriber,async (req,res) =>
{
    try 
    {
      await res.subscriber.remove()  //this will removed the subscriber
      res.json ({message: `deleted subscribers`}) //if successful
    } 
  catch (err) 
    {
      res.status(500).json ({message:err.message}) //500 means there's an error in the server
    }
})





//middleware

async function getSubscriber(req,res,next){ //getSubscriber is your middleware
    let subscriber 
    try {
        subscriber = await Subscriber.findById(req.params.id) // will check the route by checking the id
        if(subscriber == null){                //to check if subscriber does exist
            return res.status(404).json ({message:'cannot find subscriber'}) //500 means there's an error in the server
        }
    } catch (err) { 
        res.status(500).json ({message:err.message}) //500 means there's an error in the server
    }
res.subscriber = subscriber //inside all function you can use the res.subscriber 
next() //next will allow you to go to the next request 
}
module.exports = router