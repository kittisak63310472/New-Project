const { Airport } = require('../models')
module.exports = {
    // get all Airport
    async index(req, res) {
        try {
            const Airports = await Airport.findAll()
            res.send(Airports)
        } catch (err) {
            res.status(500).send({
                error: 'The Airports information was incorrect'
            })
        }
    },
    // create Airport
    async create(req, res) {
        console.log(JSON.stringify(req.body))
        try {
            const Airport = await Airport.create(req.body)
            res.send(Airport.toJSON())
        } catch (err) {
            res.status(500).send({
                error: 'Create Airport incorrect'
            })
        }
    },
    // edit Airport, suspend, active
    async put(req, res) {
        try {
            await Airport.update(req.body, {
                where: {
                    id: req.params.AirportId
                }
            })
            res.send(req.body)
        } catch (err) {
            res.status(500).send({
                error: 'Update Airport incorrect'
            })
        }
    },
    
// delete Airport
async remove(req, res) {
        try {
            const Airport = await Airport.findOne({
                where: {
                    id: req.params.AirportId
                }
            })
            if (!Airport) {
                return res.status(403).send({
                    error: 'The Airport information was incorrect'
                })
            }
            await Airport.destroy()
            res.send(Airport)
        } catch (err) {
            res.status(500).send({
                error: 'The Airport information was incorrect'
            })
        }
    },
    // get Airport by id
    async show(req, res) {
        try {
            const Airport = await Airport.findByPk(req.params.AirportId)
            res.send(Airport)
        } catch (err) {
            console.log(err)
            res.status(500).send({
                error: 'The Airport information was incorrect'
            })
        }
    }
}
