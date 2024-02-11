// routes/news.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

var url = 'https://newsapi.org/v2/everything?' +
          'q=Apple&' +
          'from=2024-01-30&' +
          'sortBy=popularity&' +
          'apiKey=2878b42d9cbe498b92950a65ffc9b990';

router.get('/news', async (req, res) => {
    try {
        const { topic } = req.query;
        const response = await axios.get(`https://newsapi.org/v2/everything?q=${topic}&from=2024-01-30&sortBy=popularity&apiKey=2878b42d9cbe498b92950a65ffc9b990`);
        const articles = response.data.articles;
        res.render('news.ejs', { articles });
    } catch (error) {
        console.error('Error fetching news:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
