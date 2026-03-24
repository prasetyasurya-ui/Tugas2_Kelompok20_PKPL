const express = require('express');
const router = express.Router();

// Halaman Utama / Biodata Kelompok
router.get('/', (req, res) => {
    res.render('index', { title: 'Home - Biodata Kelompok', namaKelompok:"Kelompok20", user: req.user || null });
});

module.exports = router;