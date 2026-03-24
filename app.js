const express = require('express')
const app = express()
const path = require('path')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.render('index', {
        namaKelompok: "Kelompok20",
        user: req.user || null
    })
})

app.listen(3000, () => console.log("Server jalan di http://localhost:3000"));