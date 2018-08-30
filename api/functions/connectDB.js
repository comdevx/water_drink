const mongoose = require('mongoose')
const config = require('../config')

mongoose.connect(config.db_mongo_url, {
    useNewUrlParser: true
})
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => console.log('db connected'))