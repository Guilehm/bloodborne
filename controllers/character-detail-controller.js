const Character = require('../database/models/marvel/character');

module.exports = async (req, res) => {

    let handleSuccess = data => {
        if (!data) return handleNotFound();
        return res.json(data);
    };

    let handleNotFound = () => {
        let message = 'Character not found.';
        return res
            .status(404)
            .json({ message });
    };

    let handleError = data => {
        return res.json(data);
    };

    let id = req.params.id;
    await Character.findOne({ id }, { _id: 0 })
        .then(handleSuccess)
        .catch(handleError);
};
