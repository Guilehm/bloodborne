const Comic = require('../../database/models/marvel/comic');
const logger = require('heroku-logger');

module.exports = async (req, res) => {

    let handleSuccess = rawData => {
        let status = rawData.lastErrorObject.updatedExisting ? 200 : 201;
        return res.status(status).json(rawData.value);
    };

    let handleError = err => {
        logger.error(err);
        return res.status(400).json(err);
    };


    let comicId = req.body.id;
    let data = req.body;
    await Comic.findOneAndUpdate({ id: comicId }, data,
        {
            upsert: true,
            new: true,
            runValidators: true,
            rawResult: true,
        }
    ).then(handleSuccess, handleError);
};
