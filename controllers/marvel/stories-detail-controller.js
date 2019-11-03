const Stories = require('../../database/models/marvel/stories');

module.exports = async (req, res) => {

    let handleSuccess = data => {
        if (!data) return handleNotFound();
        return res.json(data);
    };

    let handleNotFound = () => {
        let message = 'Stories not found.';
        return res
            .status(404)
            .json({ message });
    };

    let handleError = data => {
        return res.json(data);
    };

    let id = req.params.id;
    await Stories.findOne({ id }, { _id: 0 })
        .then(handleSuccess)
        .catch(handleError);
};
