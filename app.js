const express = require('express')
const app = express()
const path = require('path')
const webRoutes = require('./routes/web');

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', webRoutes);

app.listen(3000, () => console.log("Server jalan di http://localhost:3000"));