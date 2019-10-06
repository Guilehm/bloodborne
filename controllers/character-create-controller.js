const Character = require('../database/models/character');

module.exports = async (req, res) => {
    let characterId = req.body.id;
    let data = req.body;

    let handleSuccess = rawData => {
        let status = rawData.lastErrorObject.updatedExisting ? 200 : 201;
        return res.status(status).json(rawData.value);
    };

    let handleError = err => {
        return res.status(400).json(err);
    };

    await Character.findOneAndUpdate({ id: characterId }, data,
        {
            upsert: true,
            new: true,
            runValidators: true,
            rawResult: true,
        }
    ).then(handleSuccess, handleError);
};
