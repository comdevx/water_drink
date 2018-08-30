const express = require('express')
const app = express()
const config = require('./config')
const bodyParser = require('body-parser')
const router = express.Router()
const routes = require('./routes')
const cors = require('cors')

require('./functions/connectDB')

app.use(cors())
app.use(bodyParser.json({
    limit: '5mb'
}))
app.use(bodyParser.urlencoded({
    limit: '5mb',
    extended: true
}))

app.use(bodyParser.json())
app.use('/api', router)

routes(router)

app.listen(config.port, () => {
    console.log('service started on port ' + config.port)
})