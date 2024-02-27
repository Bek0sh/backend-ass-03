
const express = require('express');
const router = express.Router();
const Team = require('../models/teams');

router.post('/add-team', async (req, res) => {
  try {
    const {nameEN, nameRUS, descriptionEN, descriptionRUS, imageUrl} = req.body
    const team = new Team({
      nameEN: nameEN,
      nameRUS: nameRUS,
      descriptionEN: descriptionEN,
      descriptionRUS: descriptionRUS,
      imageUrl: imageUrl,
    })
    await team.save();
    res.redirect('/admin')
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', getTeam, async (req, res) => {
  try {
    Object.assign(res.team, req.body);
    await res.team.save();
    res.json(res.team);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/team/:id', async (req, res) => {
  try {
    await Team.findByIdAndDelete(req.params.id);
    res.redirect('/admin')
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getTeam(req, res, next) {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }
    res.team = team;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = router;
