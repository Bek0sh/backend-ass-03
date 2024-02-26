
const express = require('express');
const axios = require('axios');
const app = express.Router();

const apiKey = '02e7dd0b7b764a6eb677f87a09cd9bec';

app.get('/football', async (req, res) => {
    try {
        let language = req.query.lang; 
        if (!language || (language !== 'en' && language !== 'ru')) {
            language = 'en'; 
        }
        const response = await axios.get('https://api.football-data.org/v2/matches', {
            headers: {
                'X-Auth-Token': apiKey
            }
        });
        const matches = response.data.matches;
        res.render('football.ejs', { matches: matches, language: language , user: req.session.user});
    } catch (error) {
        console.error('Error fetching football matches:', error);
        res.status(500).json({ error: 'Error fetching football matches' });
    }
});

app.get('/football/:id', async (req, res) => {
    const matchId = req.params.id;
    try {
        const response = await axios.get(`https://api.football-data.org/v2/matches/${matchId}`, {
            headers: {
                'X-Auth-Token': apiKey
            }
        });
        const match = response.data;
        res.json(match);
    } catch (error) {
        console.error('Error fetching football match:', error);
        res.status(500).json({ error: 'Error fetching football match' });
    }
});

module.exports = app;
