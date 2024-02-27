
const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  nameEN: {
    type: String,
    required: true
  },
  nameRUS: {
    type: String,
    required: true
  },
  descriptionEN: String,
  descriptionRUS: String,
  imageUrl: String
});

const Team = mongoose.model('teams', teamSchema);

module.exports = Team;
