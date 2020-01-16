const mongoose = require('mongoose')
const PointSchema = require('./utils/PointSchema')

const Devschema = new mongoose.Schema({
    name: String,
    github_username: String,
    bio : String,
    avarat_url: String,
    techs: [String],
    location: {
        type: PointSchema,
        index: '2dsphere'
    }

})

module.exports = mongoose.model('Dev', Devschema)