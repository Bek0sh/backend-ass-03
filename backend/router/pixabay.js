// routes/pixabay.js
const express = require('express');
const axios = require('axios');
const router = express.Router();
const History = require('../models/history');


router.get('/pixabay', async (req, res) => {
    try {

        const requestDetails = {
            userId: req.session.user._id,
            endpoint: '/pixabay'
        };

        await History.create(requestDetails);

        const { topic } = req.query;
        const API_KEY = '42316314-3e90f5e9898a2070a0a886bc3';
        const response = await axios.get(`https://pixabay.com/api/?key=${API_KEY}&q=${topic}&image_type=photo`);
        const images = response.data.hits;
        res.render('pixabay.ejs', { images });
    } catch (error) {
        console.error('Error fetching Pixabay images:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
