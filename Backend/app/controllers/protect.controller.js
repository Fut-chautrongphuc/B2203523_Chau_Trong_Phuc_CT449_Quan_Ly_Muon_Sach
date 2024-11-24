const ApiError = require('../api-error');

exports.protected = (req, res, next) => {
    if (!req.session.user) {
        return next(new ApiError(403, "Unauthorized access"));
    }
    next();
};

exports.isAdmin = (req, res, next) => {
    if (req.session.user && req.session.user.chucvu === 'admin') {
        return next(); 
    }
    return next(new ApiError(403, "Access denied. Admins only"));
};
