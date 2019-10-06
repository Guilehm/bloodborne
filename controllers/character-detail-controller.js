const Character = require('../database/models/character');

module.exports = async (req, res) => {
    let id = req.params.id;

    let handleSuccess = data => {
        return res.json(data);
    };

    let handleNotFound = () => {
        let message = 'Character not found for id';
        return res
            .status(404)
            .json({ message });
    };

    let handleError = data => {
        return res.status(500).json(data);
    };

    await Character.findOne({ id },
        (err, character) => {
            if (!character) handleNotFound();
            if (err) handleError(err);
        })
        .then(handleSuccess, handleError);
};
