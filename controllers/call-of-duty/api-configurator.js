const axios = require('axios');


const USERNAME = process.env.COD_USERNAME;
const PASSWORD = process.env.COD_PASSWORD;


class COD {
    constructor() {
        this.baseURL = 'https://profile.callofduty.com';
        this.username = USERNAME;
        this.password = PASSWORD;
        this.instance = this.getAxiosInstance();
        this.cookies = this.setCookies();
    }

    getAxiosInstance() {
        return axios.create({
            baseURL: this.baseURL,
            withCredentials: true,
        });
    }

    setCookies() {
        const loginEndpoint = '/cod/login';
        const saveCookie = result => this.cookies = result.headers['set-cookie'];
        const instance = this.instance;
        instance.get(loginEndpoint)
            .then(saveCookie)
            .catch(err => console.log('deu merda', err));
    }

    doLogin() {
        const authEndpoint = `${this.baseURL}/do_login?new_SiteId=cod`;
        const XSRF = this.cookies
            .find(c => c.includes('XSRF-TOKEN=')).split(';')[0].split('=')[1];
        const headers = {
            'Cookie': `XSRF-TOKEN=${XSRF}`
        };
        const data = {
            'username': USERNAME,
            'password': PASSWORD,
            'remember_me': true,
            '_csrf': `${XSRF}`,
        };
        const options = {
            method: 'POST',
            url: authEndpoint,
            data,
            headers,
        };
        const handleSuccess = result => result;
        axios(options)
            .then(handleSuccess)
            .catch(err => console.log(err));
    }
}

module.exports = COD;
