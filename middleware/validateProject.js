function validateProject(req, res, next) {
    const body = req.body
    
    if (Object.keys(body).length === 0) {
        res.status(400).json({ message: 'Missing project data.' })
    } else if (!body.name) {
        res.status(400).json({ message: 'Missing required name field.' })
    } else if (!body.description) {
        res.status(400).json({ message: 'Missing required description field.' })
    } else {
        next()
    }
}

module.exports = validateProject