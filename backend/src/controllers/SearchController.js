const axios = require('axios')
const Dev = require('../models/Dev')
const parseArrayAsString = require('../utils/parseStringasArray')

module.exports = {
    async index(req,res){

        const {techs, latitude, longitude}  = req.query
        const techUpperCase = techs.toUpperCase()
        const arrayTechs = parseArrayAsString(techUpperCase) 

        const devs = await Dev.find({
            techs: {
                $in: arrayTechs,
            },
            location: {
                $near:{
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 10000,
                }
            },
        })
        
        if(devs.length === 0){
            
            return res.status(401).json({error: 'Not users near you'})
        }
        
        return res.json(devs)
    }
}