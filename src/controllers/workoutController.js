const workoutService = require('../services/workoutService')

const getAllWorkouts = (req, res) => res.send({ data: workoutService.getAllWorkouts(req.params.page || 1) })

const getOneWorkout = (req, res) => res.send({ data: workoutService.getOneWorkout(req.params.workoutId) })

const createNewWorkout = (req, res) => res.send({ data: workoutService.createNewWorkout(req.body) })

const updateOneWorkout = (req, res) => {
  const { body, params: { workoutId } } = req;
  res.send({ data: workoutService.updateOneWorkout(workoutId, body) })
}

const deleteOneWorkout = async (req, res) => {
  const { params: { workoutId } } = req;
  await workoutService.deleteOneWorkout(workoutId);
  await res.send("Delete an one workout");
};

module.exports = {
  getAllWorkouts,
  getOneWorkout,
  createNewWorkout,
  updateOneWorkout,
  deleteOneWorkout,
};