const axios = require('axios')
const Dev = require('../models/Dev')
const parseArrayAsString = require('../utils/parseStringasArray')

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
    
        const techsArray = parseArrayAsString(techs)
    
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
    
        return res.json(dev)
    },
    async destroy(req, res){
        const {github_username}  = req.body
        const devs = await Dev.findOneAndDelete(github_username)
        return res.json(devs)
    },
    async update(req, res){
        const devs = await Dev.find()
        return res.json(devs)
    },
}