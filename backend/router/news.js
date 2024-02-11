// routes/news.js
const express = require('express');
const axios = require('axios');
const router = express.Router();
const History = require('../models/history');

router.get('/news', async (req, res) => {
    try {

        const requestDetails = {
            userId: req.session.user._id,
            endpoint: '/news'
        };

        await History.create(requestDetails);

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
