const express = require('express');
const router = express.Router();
const { requireLogin, requireWhitelist } = require('../middleware/auth');
const { setTheme } = require('../config/themeStore');

const ALLOWED_BACKGROUND = new Set([
    'bg-gray-100',
    'bg-slate-200',
    'bg-blue-100',
    'bg-green-100',
    'bg-yellow-100'
]);

const ALLOWED_FONT = new Set([
    'font-sans',
    'font-serif',
    'font-mono'
]);


// endpoint awal
router.get('/status', (req, res) => {
    res.json({ message: "Backend API is ready!" });
});

// Endpoint edit theme, hanya untuk whitelist
router.post('/theme', requireLogin, requireWhitelist, (req, res) => {
    const { background, font } = req.body;

    if (!ALLOWED_BACKGROUND.has(background) || !ALLOWED_FONT.has(font)) {
        return res.status(400).json({
            success: false,
            message: 'Pilihan theme tidak valid'
        });
    }

    const updatedTheme = setTheme({
        background,
        font
    });

    return res.json({
        success: true,
        message: 'Theme berhasil disimpan',
        data: updatedTheme
    });
});

// Teman-teman bisa lanjut di sini:
// router.post('/login', ...)

module.exports = router;