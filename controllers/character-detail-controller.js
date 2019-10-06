const Character = require('../database/models/character');

module.exports = async (req, res) => {

    let handleSuccess = data => {
        return res.json(data);
    };

    let handleNotFound = () => {
        let message = 'Character not found.';
        return res
            .status(404)
            .json({ message });
    };

    let handleError = data => {
        return res.status(500).json(data);
    };

    let id = req.params.id;
    await Character.findOne({ id }, { _id: 0 },
        (err, character) => {
            if (!character) handleNotFound();
            if (err) handleError(err);
        })
        .then(handleSuccess, handleError);
};
