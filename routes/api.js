const express = require('express');
const router = express.Router();

// Contoh endpoint awal
router.get('/status', (req, res) => {
    res.json({ message: "Backend API is ready!" });
});

// Teman-teman bisa lanjut di sini:
// router.post('/login', ...)

module.exports = router;