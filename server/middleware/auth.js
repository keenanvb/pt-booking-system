const jwt = require('jsonwebtoken');

let auth = (req, res, next) => {
    //Get token from header

    const token = req.header('x-auth-token');

    //Check if no token
    if (!token) {
        return res.status(401).json({ mgs: 'No token,auth denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;

        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' })
    }
}

module.exports = auth