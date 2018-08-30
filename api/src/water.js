const waters = require('../schemas/waters')

exports.create = (req, res) => {
    let body = req.body
    new waters(body).save((err, result) => {
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