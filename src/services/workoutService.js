const DB = require("../database/db.json")
const { v4: uuid } = require('uuid');
const { saveToDatabase } = require("../database/utils");

const getAllWorkouts = (page) => {
  try {
    const startIndex = (page - 1) * 20;
    const endIndex = page * 20;
    return allWorkouts = DB.workouts.slice(startIndex, endIndex);
  } catch (e) {
    throw e;
  }
};

const getOneWorkout = (id) => {
  try {
    const workout = DB.workouts.find((workout) => workout.id == id);
    return getWorkoutById = workout ? workout : 'No Workout found!'
  } catch (e) { throw e; }
};

const createNewWorkout = (newWorkout) => {
  try {

    const isAlreadyAdded = DB.workouts.findIndex((workout) => workout.name === newWorkout.name) > -1;

    if (!newWorkout.name ||
      !newWorkout.mode ||
      !newWorkout.equipment ||
      !newWorkout.exercises ||
      !newWorkout.trainerTips) {
      throw { status: 404, message: "One of the following keys is missing or is empty in request newWorkout: 'name', 'mode', 'equipment', 'exercises', 'trainerTips'" }
    } else if (isAlreadyAdded) {
      throw {
        status: 400,
        message: `${newWorkout?.name} is already added !!`
      }
    }

    const insertNewWorkout = {
      ...newWorkout,
      id: uuid(),
      createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
      updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    }

    DB.workouts.push(insertNewWorkout);
    saveToDatabase(DB);
    return createdWorkout = insertNewWorkout

  } catch (err) {
    throw err;
  }
};

const updateOneWorkout = (id, updateData) => {
  try {
    if (!id) {
      throw { status: 404, message: 'Please enter update ID' }
    }

    const getIndexForWorkout = DB.workouts.findIndex((workout) => workout.id === id);
    const updateWorkout = {
      ...updateData,
      updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    }
    DB.workouts[getIndexForWorkout] = updateWorkout;
    saveToDatabase(DB);
    return updateWorkout;
  } catch (e) { throw e };
};

const deleteOneWorkout = (id) => {
  try {
    const getIndexForWorkout = DB.workouts.findIndex((workout) => workout.id === id);
    DB.workouts.splice(getIndexForWorkout, 1);
    saveToDatabase(DB);
    return 'Workout deleted'
  } catch (e) { throw e };
};

module.exports = {
  getAllWorkouts,
  getOneWorkout,
  createNewWorkout,
  updateOneWorkout,
  deleteOneWorkout,
};