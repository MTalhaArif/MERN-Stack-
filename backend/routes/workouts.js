const express= require ('express');
const { createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout

} = require('../controller/workoutController');

const router= express.Router();

const Workout= require('../model/workoutModel');
const requireAuth = require ('../middleware/requireAuth')

//Require Auth for all workouts

router.use (requireAuth)


//get all workouts

router.get('/', getWorkouts)

//get a single workout
router.get('/:id', getWorkout)

//post a new workout
router.post('/',createWorkout)

//delete a workout
router.delete('/:id',deleteWorkout)

//update a workout
router.patch('/:id',updateWorkout)

module.exports = router;