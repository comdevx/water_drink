const waters = require('../schemas/waters')
const coins = require('../schemas/coins')

exports.list = async (req, res) => {
    const water = await waters.find()
    const coin = await coins.find()
    const products = await checkStock(water)
    res.json({
        status: 1000,
        result: {
            coins: coin,
            products
        }
    })
}

checkStock = (obj) => {
    let list = []
    obj.map(docs => {
        const stock = docs.amount > 0 ? true : false
        Object.assign(docs._doc, {
            stock
        })
        list.push(docs)
    })
    return list
}