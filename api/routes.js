const water = require('./src/water')
const coin = require('./src/coin')
const main = require('./src/main')

module.exports = (router) => {
    router.post('/waters/create', water.create)
    router.post('/coins/create', coin.create)
    router.get('/main', main.list)
}