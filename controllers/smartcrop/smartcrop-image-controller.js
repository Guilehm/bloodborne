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

    let handleSuccess = crop => {

        let handleCropSuccess = crop => {
            res.writeHead(200, { 'Content-Type': 'image/png' });
            return res.end(crop, 'binary');
        }

        let { x, y } = crop.topCrop;
        let wd = crop.topCrop.width;
        let hg = crop.topCrop.height;
        sharp(img)
            .extract({ width: wd, height: hg, left: x, top: y })
            .toBuffer()
            .then(handleCropSuccess)
            .catch(handleError);
    }

    let handleError = err => {
        console.log('ERROR !!!!!!!!!!!')
        console.log(err)
        return res.status(500).json({ error: err })
    }

    smartcrop.crop(img, { width: width || 10, height: height || 10 })
        .then(handleSuccess)
        .catch(handleError);
}
