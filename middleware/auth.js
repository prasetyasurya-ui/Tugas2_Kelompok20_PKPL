const WHITELIST_EMAILS = require("../config/whitelist");

function requireLogin(req, res, next) {
    if (!req.session.user) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized: login dulu'
        })
    }

    next();
}

function requireWhitelist(req, res,next) {
    const user = req.session.user;

    if (!user) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized: login dulu',
        });
    }

    const email = (user.email || '').toLowerCase();

    if (!WHITELIST_EMAILS.includes(email)) {
        return res.status(403).json({
            success: false,
            message: 'Forbidden: email tidak ada di whitelist',
        });
    }

    next();
}

module.exports = {
    requireLogin,
    requireWhitelist
}