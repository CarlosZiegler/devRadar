const axios = require('axios')
const Dev = require('../models/Dev')
const parseArrayAsString = require('../utils/parseStringasArray')
const {findConnections, sendMessage} = require('../websocket')

module.exports = {
    async index(req, res){
        const devs = await Dev.find()
        return res.json(devs)
    },

    async store(req,res){

        const {github_username, techs, latitude, longitude}  = req.body

        const findDev = await Dev.findOne({github_username})
        
        if(findDev){
            return res.status(401).json({error: 'User ready exists'})
        }

        const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`)
        
        const { name = login, avatar_url, bio} = apiResponse.data
        
        const techsArray = parseArrayAsString(techs.toUpperCase())
    
        const location = {
            type: 'Point',
            coordinates: [longitude,latitude]
        }
    
        const dev = await Dev.create({
            github_username,
            name,
            avatar_url,
            bio,
            techs: techsArray,
            location
        })

        // filter connections maximal 10 km near and new dev have a Tche filtered
        const sendSocketMessageTo = findConnections(
            {
                latitude,
                longitude
            }, 
                techsArray
        )
        
        sendMessage(sendSocketMessageTo, 'new-dev', dev)
            
        return res.json(dev)
    },
    async destroy(req, res){
        const {github_username}  = req.body
        const devs = await Dev.findOneAndDelete(github_username)
        return res.json(devs)
    },
    async update(req, res){
        const {github_username, techs, latitude, longitude}  = req.body

        const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`)
        
        const { name = login, avatar_url, bio} = apiResponse.data
    
        const techsArray = parseArrayAsString(techs)
    
        const location = {
            type: 'Point',
            coordinates: [longitude,latitude]
        }
        //const dev = await Dev.findOne({github_username})
        const updatedDataDev = {
            name,
            avatar_url,
            bio,
            techs: techsArray,
            location
        }
        
        const result = await Dev.updateOne({github_username},updatedDataDev)
        if (result.nModified !== 1) {
            return res.status(401).json({error: 'User not updated'})
        }
        const dev = await Dev.findOne({github_username})
        return res.json({message: 'User`s data are been updated', dev})
    },
}