const request = require('request')

module.exports = (req, res) => {
    const endpoint = 'https://fortnite-api.theapinetwork.com/weapons/get'
    let token = process.env.TOKEN

    let handleError = (status, message) => {
        res.status(status).end(JSON.stringify({
            success: false,
            message: message,
        }))
    }

    let handleSuccess = data => {
        response = data.data
        response.success = true
        res.end(JSON.stringify(response))
    }

    if (!token) return handleError(500, 'missing token')

    let options = {
        url: endpoint,
        headers: { Authorization: token },
    }

    request(options, (error, response, body) => {
        if (error) handleError(500, error)
        data = JSON.parse(body)
        if (data.success === false) {
            return handleError(200, data.errorMessage || data.error)
        }
        return handleSuccess(data)
    })
}
