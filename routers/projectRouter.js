const express = require('express')

const Projects = require('../data/helpers/projectModel.js')

const validateId = require('../middleware/validateId.js')

const router = express.Router()

router.get('/:id', validateId(Projects), (req, res) => {
    Projects.get(req.resource.id)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'Error retrieving project.'
            })
        })
})

module.exports = router