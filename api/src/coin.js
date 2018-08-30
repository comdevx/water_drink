const coins = require('../schemas/coins')

exports.create = (req, res) => {
    let body = req.body
    new coins(body).save((err, result) => {
        if (err) {
            res.json({
                status: 3000,
                msg: err
            })
        } else {
            res.json({
                status: 1000,
                result
            })
        }
    })
}