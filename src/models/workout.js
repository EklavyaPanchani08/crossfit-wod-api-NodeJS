const mongoose = require('../database/db');

const workoutSchema = new mongoose.Schema({
  name: String,
  mode: String,
});

const workout = mongoose.model('Workout', workoutSchema);

module.exports = workout;