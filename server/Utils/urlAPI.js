const sandBoxMode = true;
const URL = (sandBoxMode)
    ? 'https://sandbox.iexapis.com'
    : 'https://cloud.iexapis.com'
const TOKEN = (sandBoxMode)
    ? process.env.API_TOKEN_SANDBOX
    : process.env.API_TOKEN
module.exports = { URL, TOKEN };