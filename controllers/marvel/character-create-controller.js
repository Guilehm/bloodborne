const Character = require('../../database/models/marvel/character');

module.exports = async (req, res) => {

    let handleSuccess = rawData => {
        let status = rawData.lastErrorObject.updatedExisting ? 200 : 201;
        return res.status(status).json(rawData.value);
    };

    let handleError = err => {
        return res.status(400).json(err);
    };


    let characterId = req.body.id;
    let data = req.body;
    await Character.findOneAndUpdate({ id: characterId }, data,
        {
            upsert: true,
            new: true,
            runValidators: true,
            rawResult: true,
        }
    ).then(handleSuccess, handleError);
};
