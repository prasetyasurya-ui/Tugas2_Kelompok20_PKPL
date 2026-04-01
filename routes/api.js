const express = require('express');
const router = express.Router();
const { requireLogin, requireWhitelist } = require('../middleware/auth');


// endpoint awal
router.get('/status', (req, res) => {
    res.json({ message: "Backend API is ready!" });
});

// Endpoint edit theme, hanya untuk whitelist
router.post('/theme', requireLogin, requireWhitelist, (req, res) => {
    // TODO: William implement endpoint ini untuk ganti tema
    return res.json({
        success: true,
        message: 'Authorized',
    });
});

// Teman-teman bisa lanjut di sini:
// router.post('/login', ...)

module.exports = router;