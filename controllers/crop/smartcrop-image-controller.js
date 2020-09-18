const smartcrop = require('smartcrop-gm');
const axios = require('axios');
const sharp = require('sharp');


const WIDTH_LIMIT = 3840;
const HEIGHT_LIMIT = 2160;


function validateDimensions(width, height) {
    try {
        width = parseInt(width);
        height = parseInt(height);
    } catch (e) {
        return [false, e.message];
    }
    if (width > WIDTH_LIMIT || height > HEIGHT_LIMIT) {
        let message = `Images cannot be larger than ${WIDTH_LIMIT} x ${HEIGHT_LIMIT} px.`;
        return [false, message];
    }
    return [true, null, width, height];
}


module.exports = async (req, res) => {

    let { url, width, height } = req.query;
    let img;

    let handleBadRequest = error => {
        return res.status(400).json({ error });
    };

    if (!url) handleBadRequest('Please, provide an url parameter');

    let [validated, message, vWidth, vHeight] = validateDimensions(width, height);
    if (!validated) handleBadRequest(message);

    try {
        const response = await axios.get(encodeURI(url), { responseType: 'arraybuffer' });
        img = response.data;
    } catch (err) {
        if (err.response.status === 403) {
            url = req.url.split('url=')[1];
            const response = await axios.get(encodeURI(url), {responseType: 'arraybuffer'});
            img = response.data;
        } else {
            return res.status(500).json({ error: err });
        }
    }

    let handleError = error => {
        return res.status(500).json({ error: error.message });
    };


    let handleSuccess = crop => {
        let handleCropSuccess = crop => {
            res.writeHead(200, { 'Content-Type': 'image/png' });
            return res.end(crop, 'binary');
        };

        let { x, y } = crop.topCrop;
        let wd = crop.topCrop.width;
        let hg = crop.topCrop.height;
        vWidth = vWidth || wd;
        vHeight = vHeight || hg;

        sharp(img)
            .extract({ width: wd, height: hg, left: x, top: y })
            .resize({width: vWidth, height: vHeight})
            .toBuffer()
            .then(handleCropSuccess)
            .catch(handleError);
    };
    smartcrop.crop(img)
        .then(handleSuccess)
        .catch(handleError);
};
