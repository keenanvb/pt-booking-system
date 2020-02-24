
//Grant access to specific roles
exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                errors: [{
                    msg: `${req.user.role} Not authorized to access this route`
                }]
            })
        }
        next();
    }
}