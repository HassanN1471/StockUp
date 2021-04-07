const jwt = require("jsonwebtoken");

const JWT_KEY = process.env.JWT_KEY;

function authorize(req, res, next) {
    // Logic for getting the token and
    // decoding the contents of the token. The
    // decoded contents should be placed on req.decoded
    // If the token is not provided, or invalid, then
    // this function should not continue on to the
    // end-point.
    console.log(req.headers.authorization);
    const tokenString = req.headers.authorization;
    const token = tokenString ? tokenString.split(' ')[1] : '';
    if (token.length > 0) {
        jwt.verify(token, JWT_KEY, (err, decodedData) => {
            if (err) {
                return res.status(403).json({ message: 'Token invalid or expired' });
            } else {
                req.decoded = decodedData;
                next();
            }
        })
    }
    else {
        return res.status(403).json({ message: 'Not authorized to access this.' });
    }
}

module.exports = { authorize };