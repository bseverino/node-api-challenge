const express = require('express')

const Projects = require('../data/helpers/projectModel.js')
const Actions = require('../data/helpers/actionModel.js')

const validateId = require('../middleware/validateId.js')
const validateProject = require('../middleware/validateProject.js')
const validateAction = require('../middleware/validateAction.js')

const router = express.Router()

router.get('/', (req, res) => {
    Projects.get()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'Error retrieving projects.'
            })
        })
})

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

router.get('/:id/actions', validateId(Projects), (req, res) => {
    Projects.getProjectActions(req.resource.id)
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

router.post('/', validateProject, (req, res) => {
    Projects.insert(req.body)
        .then(project => {
            res.status(201).json(project)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'Error adding project.'
            })
        })
})

router.post('/:id', validateAction, validateId(Projects), (req, res) => {
    const newAction = {
        ...req.body,
        project_id: req.resource.id
    }

    Actions.insert(newAction)
        .then(action => {
            res.status(201).json(action)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'Error adding action.'
            })
        })
})

router.put('/:id', validateProject, validateId(Projects), (req, res) => {
    Projects.update(req.resource.id, req.body)
        .then(project => {
            res.status(201).json(project)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'Error updating project.'
            })
        })
})

router.delete('/:id', validateId(Projects), (req, res) => {
    Projects.remove(req.resource.id)
        .then(deleted => {
            res.status(202).json(deleted)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'Error deleting project.'
            })
        })
})

module.exports = router