const express = require('express');
const session = require('express-session');
const db = require('./db');
const axios = require('axios');
const History = require('./models/history');
const authRoutes = require('./router/auth');
const adminRoutes = require('./router/admin');
const pixabayRoutes = require('./router/pixabay');
const football = require('./router/football')
const { authenticateUser, authenticateAdmin } = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: '1234', resave: false, saveUninitialized: true }));

app.use('/auth', authRoutes);

app.get('/login', (req, res) => {
    res.render('login.ejs'); 
});

app.get('/register', (req, res) => {
    res.render('register.ejs'); 
});

app.get('/main', authenticateUser, async (req, res) => {
    try {
        let language = req.query.lang; 
        if (!language || (language !== 'en' && language !== 'ru')) {
            language = 'en'; 
        }     
        res.render('main.ejs', { user: req.session.user ,language: language});
    } catch (error) {
        console.error('Error fetching news:', error);
        res.status(500).send('Error fetching news');
    }
});

app.use('/', authenticateUser, football)


app.use('/', authenticateUser, pixabayRoutes)

app.get('/news', async (req, res) => {
    try {
        let language = req.query.lang; 
        if (!language || (language !== 'en' && language !== 'ru')) {
            language = 'en'; 
        }
        const newsUrl = 'https://newsapi.org/v2/top-headlines';
        const response = await axios.get(newsUrl, {
            params: {
                country: 'us', 
                apiKey: "2878b42d9cbe498b92950a65ffc9b990"
            }
        });
        const articles = response.data.articles; 
        res.render('news.ejs', { user: req.session.user ,language: language, articles: articles});
    } catch (error) {
        console.error('Error fetching news:', error);
        res.status(500).send('Error fetching news');
    }
})

app.use(authenticateAdmin)
app.use('', adminRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
