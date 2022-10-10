const { nike } = require('../models')
module.exports = {
    // get all nike
    async index(req, res) {
        try {
            const nikes = await nike.findAll()
            res.send(nikes)
        } catch (err) {
            res.status(500).send({
                error: 'The nikes information was incorrect'
            })
        }
    },
    // create nike
    async create(req, res) {
        console.log(JSON.stringify(req.body))
        try {
            const nike = await nike.create(req.body)
            res.send(nike.toJSON())
        } catch (err) {
            res.status(500).send({
                error: 'Create nike incorrect'
            })
        }
    },
    // edit nike, suspend, active
    async put(req, res) {
        try {
            await nike.update(req.body, {
                where: {
                    id: req.params.nikeId
                }
            })
            res.send(req.body)
        } catch (err) {
            res.status(500).send({
                error: 'Update nike incorrect'
            })
        }
    },
    
// delete nike
async remove(req, res) {
        try {
            const nike = await nike.findOne({
                where: {
                    id: req.params.nikeId
                }
            })
            if (!nike) {
                return res.status(403).send({
                    error: 'The nike information was incorrect'
                })
            }
            await nike.destroy()
            res.send(nike)
        } catch (err) {
            res.status(500).send({
                error: 'The nike information was incorrect'
            })
        }
    },
    // get nike by id
    async show(req, res) {
        try {
            const nike = await nike.findByPk(req.params.nikeId)
            res.send(nike)
        } catch (err) {
            console.log(err)
            res.status(500).send({
                error: 'The nike information was incorrect'
            })
        }
    }
}
