const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET_KEY

const verifyAdminToken = (req, res, next) => {
    const token = req.headers['authentication']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access Deniewd . No token provided' })
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid credientials' })
        }
        req.user = user;
        next()
    })
}

module.exports = verifyAdminToken