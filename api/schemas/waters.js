const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = mongoose.model('Waters', new Schema({
    name: {
        type: String,
            required: true
    },
    image: {
        type: String,
            required: true
    },
    price: {
        type: Number,
            required: true
    },
    amount: {
        type: Number,
            required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date
    }
}, {
    versionKey: false
}))