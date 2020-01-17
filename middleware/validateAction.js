function validateAction(req, res, next) {
    const body = req.body
    if (Object.keys(body).length === 0) {
        res.status(400).json({ message: 'Missing action data.' })
    } else if (!body.description) {
        res.status(400).json({ message: 'Missing required description field.' })
    } else if (!body.notes) {
        res.status(400).json({ message: 'Missing required notes field.' })
    } else if (body.description.length > 128) {
        res.status(400).json({ message: 'Description too long, must be 128 characters or under.' })
    } else {
        next()
    }
}

module.exports = validateAction