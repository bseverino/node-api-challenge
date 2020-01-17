const express = require('express')

const Actions = require('../data/helpers/actionModel.js')

const validateId = require('../middleware/validateId.js')
const validateAction = require('../middleware/validateAction.js')

const router = express.Router()

router.get('/', (req, res) => {
    Actions.get()
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'Error retrieving actions.'
            })
        })
})

router.get('/:id', validateId(Actions), (req, res) => {
    Actions.get(req.resource.id)
        .then(action => {
            res.status(200).json(action)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'Error retrieving action.'
            })
        })
})

router.put('/:id', validateAction, validateId(Actions), (req, res) => {
    Actions.update(req.resource.id, req.body)
        .then(action => {
            res.status(201).json(action)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'Error updating action.'
            })
        })
})

router.delete('/:id', validateId(Actions), (req, res) => {
    Actions.remove(req.resource.id)
        .then(deleted => {
            res.status(202).json(deleted)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'Error deleting action.'
            })
        })
})

module.exports = router