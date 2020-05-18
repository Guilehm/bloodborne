const axios = require('axios');


const USERNAME = process.env.COD_USERNAME;
const PASSWORD = process.env.COD_PASSWORD;

class COD {
    constructor() {
        this.baseURL = 'https://profile.callofduty.com/';
        this.username = USERNAME;
        this.password = PASSWORD;
        this.setCookie = null;
    }

    getAxiosInstance() {
        return axios.create({
            baseURL: this.baseURL,
            withCredentials: true,
        });
    }

    getCookies() {
        const setCookie = result => this.setCookie = result.headers['set-cookie'];
        const instance = this.getAxiosInstance();
        instance.get('cod/login')
            .then(setCookie)
            .catch(err => console.log('deu merda', err));
    }
}


module.exports = COD;
