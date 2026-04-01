require('dotenv').config();
const {google} = require('googleapis');
const session = require('express-session');
const express = require('express')
const app = express()
const path = require('path')

const webRoutes = require('./routes/web');
const apiRoutes = require('./routes/api');
const WHITELIST_EMAILS = require('./config/whitelist');

// Middleware body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

// Setup Google oauth
const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    'http://localhost:3000/auth/google/callback'
)

const scopes = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile'
]

const authorizationUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    include_granted_scopes: true,
})

// Google login route
app.get('/auth/google', (req, res) => {
    res.redirect(authorizationUrl);
})

// Google callback login route
app.get('/auth/google/callback', async (req, res) => {
    try {
        const {code} = req.query;

        const {tokens} = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);

        const oauth2 = google.oauth2({
            auth: oauth2Client,
            version: 'v2',
        });

        const {data} = await oauth2.userinfo.get();

        if (!data) {
            return res.status(401).send("Gagal mendapatkan data dari Google");
        }

        const email = (data.email || '').toLocaleLowerCase();
        const isWhitelisted = WHITELIST_EMAILS.includes(email);

        req.session.user= {
            displayName: data.name,
            email: data.email,
            picture: data.picture,
            isWhitelisted
        }

        res.redirect('/');
    } catch (error) {
        console.error('Google OAuth Error:', error);
        res.status(500).send('Terjadi error saat login Google');
    }
})

// Logout route
app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});

// Middleware
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', webRoutes);
app.use('/api', apiRoutes)

app.listen(3000, () => console.log("Server jalan di http://localhost:3000"));