const express = require('express');
const session = require('express-session');
const db = require('./db');
const authRoutes = require('./router/auth');
const adminRoutes = require('./router/admin');
const newsRoutes = require('./router/news');
const pixabayRoutes = require('./router/pixabay');
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

app.get('/main', authenticateUser, (req, res) => {
    res.render('main.ejs', { user: req.session.user }); 
});

app.use('/', authenticateUser, newsRoutes)
app.use('/', authenticateUser, pixabayRoutes)

app.use(authenticateAdmin)
app.use('', adminRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
