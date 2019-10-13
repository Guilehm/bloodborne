const Character = require('../database/models/character')

module.exports = async (req, res) => {

    let handleSuccess = data => {
        data.forEach(d => {
            d.url = `${d.thumbnail.path}.${d.thumbnail.extension}`
            delete d.thumbnail
        })
        return res.json(data)
    }

    let handleError = err => {
        return res.json({ error: true })
    }

    await Character.find({}, {
        _id: 0,
        name: 1,
        thumbnail: 1,
        url: 1
    })
        .lean()
        .then(handleSuccess)
        .catch(handleError)
}