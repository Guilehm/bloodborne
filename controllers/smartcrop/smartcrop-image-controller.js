const smartcrop = require('smartcrop-gm');
const axios = require('axios');
const sharp = require('sharp');


module.exports = async (req, res) => {

    let { url, width, height } = req.query;
    let img;

    if (!url) res.status(400).json({ error: 'Please, provide an url parameter' });

    try {
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        img = response.data;
    } catch (err) {
        return res.status(500).json({ error: err });
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
