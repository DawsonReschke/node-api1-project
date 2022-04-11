const express = require('express')
const bodyParser = require('body-parser')
const server = express(); 
const DB = require('./users/model')
server.use(bodyParser.json())



server.post('/api/users',async (req,res)=>{
    const {body} = req
    if(!body?.name || !body?.bio){ 
        res.status(400).json({message:"Please provide name and bio for the user"})
        return
    }
    DB.insert({name:body.name,bio:body.bio})
    .then(inserted => res.status(201).json(inserted))
    .catch(e=>res.status(500).json({message:'There was an error while saving the user to the database'}))
    
})

server.get('/api/users',async(req,res)=>{
    DB.find()
    .then(users=>res.json(users))
    .catch(e=>res.status(500).json({message:"The users information could not be retrieved"}))
})

server.get('/api/users/:id',async (req,res)=>{
    const {id} = req.params
    DB.findById(id)
        .then(user=>{
            if(!user) return res.status(404).json({message:"The user with the specified ID does not exist"})
            res.json(user) 
        })
        .catch(e=>res.status(500).json({message:"The user information could not be retrieved"}))
})

server.delete('/api/users/:id',async(req,res)=>{
    const {id} = req.params
    DB.remove(id)
        .then(removedUser => {
            if(!removedUser) return res.status(404).json({message:"The user with the specified ID does not exist"})
            res.json(removedUser)
        })
        .catch(e=>res.status(500).json({message:"The user cannot be removed"}))
})

server.put('/api/users/:id',async(req,res)=>{
    const {id} = req.params
    const {name, bio} = req.body
    if(!name||!bio) return res.status(400).json({message:"Please provide name and bio for the user"})
    DB.update(id,req.body)
        .then(updatedUser => {
            if(!updatedUser) return res.status(404).json({message:"The user with the specified ID does not exist"})
            res.json(updatedUser)
        })
        .catch(e=>res.status(500).json({message:"The user information could not be modified"}))
})

module.exports = server;
