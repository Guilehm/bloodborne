const axios = require('axios');


const USERNAME = process.env.COD_USERNAME;
const PASSWORD = process.env.COD_PASSWORD;


class COD {
    constructor() {
        this.baseURL = 'https://profile.callofduty.com/';
        this.username = USERNAME;
        this.password = PASSWORD;
        this.headers = this.setHeaders();
    }

    getAxiosInstance() {
        return axios.create({
            baseURL: this.baseURL,
            withCredentials: true,
        });
    }

    setHeaders() {
        const setCookie = result => this.headers = ({
            cookie: result.headers['set-cookie']
        });
        const instance = this.getAxiosInstance();
        instance.get('cod/login')
            .then(setCookie)
            .catch(err => console.log('deu merda', err));
    }
}

module.exports = COD;
