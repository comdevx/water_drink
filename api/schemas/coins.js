const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = mongoose.model('Coins', new Schema({
    name: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
}, {
    versionKey: false
}))