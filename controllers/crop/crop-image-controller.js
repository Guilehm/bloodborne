const axios = require('axios');
const sharp = require('sharp');


const WIDTH_LIMIT = 3840;
const HEIGHT_LIMIT = 2160;
const VALID_FITS = ['cover', 'contain', 'fill', 'inside', 'outside'];


module.exports = async (req, res) => {
    let { url, fit } = req.query;

    const handleError = error => res.status(400).json({ error });
    if (!url) return handleError('Please provide an url parameter');

    const validateDimensions = (width, height) => {
        if (width > WIDTH_LIMIT || height > HEIGHT_LIMIT) return handleError('Dimensions above limit');
        try {
            width = parseInt(width) || null;
            height = parseInt(height) || null;
        } catch (e) {
            return handleError('Invalid dimensions.');
        }
        return [width, height];
    };

    const [width, height] = validateDimensions(req.query.width, req.query.height);

    let img;
    try {
        const response = await axios.get(encodeURI(url), { responseType: 'arraybuffer' });
        img = response.data;
    } catch (err) {
        if (err.response.status === 403) {
            url = req.url.split('url=')[1];
            const response = await axios.get(encodeURI(url), { responseType: 'arraybuffer' });
            img = response.data;
        } else {
            return res.status(500).json({ error: err });
        }
    }

    const handleSharpError = error => res.status(500).json({ error: error.message });
    const handleCropSuccess = crop => {
        res.writeHead(200, { 'Content-Type': 'image/png' });
        return res.end(crop, 'binary');
    };

    fit = VALID_FITS.includes(fit) ? fit : 'cover';

    sharp(img)
        .resize({ width, height, fit })
        .toBuffer()
        .then(handleCropSuccess)
        .catch(handleSharpError);
};
