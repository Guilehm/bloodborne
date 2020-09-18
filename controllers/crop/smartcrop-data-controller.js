const smartcrop = require('smartcrop-gm');
const axios = require('axios');


module.exports = async (req, res) => {

    let { url, width, height } = req.query;
    let img;

    if (!url) return res.status(400).json({ error: 'Please, provide an url parameter' });

    try {
        const response = await axios.get(encodeURI(url), { responseType: 'arraybuffer' });
        img = response.data;
    } catch (err) {
        return res.status(500).json({ error: err });
    }

    let handleSuccess = crop => res.json(crop);

    let handleError = err => res.status(500).json({ error: err });

    smartcrop.crop(img, { width: width || 348, height: height || 348 })
        .then(handleSuccess)
        .catch(handleError);
};
