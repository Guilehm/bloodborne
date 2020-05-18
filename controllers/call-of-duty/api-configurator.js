const axios = require('axios');


const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;

class COD {
    constructor() {
        this.loginUrl = 'https://profile.callofduty.com/cod/login';
        this.username = USERNAME;
        this.password = PASSWORD;
        this.csrf = null;
    }
}


module.exports = COD;
