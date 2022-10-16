const Workout= require('../model/workoutModel');
const mongoose = require( 'mongoose' );

//get all workouts
const getWorkouts = async (req,res) =>{
    const workouts = await Workout.find({}).sort({createdat : -1})

    res.status(200).json(workouts)
}

//get a single workout
const getWorkout = async (req, res) =>{
    const {id}=req.params //gets id from route parameters

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error : 'No such workout found'})
    }

    const workout= await Workout.findById(id)
    if(!workout){
        return res.status(404).json({error : 'Not found by id'})
    }
    res.status(200).json (workout)
}

//create a new workout

const createWorkout =async (req, res)=>{
    const {title, reps, load} = req.body;

    //error handling
    let emptyFields=[]

    if(!title){
        emptyFields.push('title')
    }
    if(!load){
        emptyFields.push('load')
    }
    if(!reps){
        emptyFields.push('reps')
    }
    if (emptyFields.length>0){
        return res.status(400).json({error : 'Please fill all the fields', emptyFields})
    }


    //add doc to db
    try{
        const workout= await Workout.create({title,reps,load})
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json ({error :error.message})
    }

}


//delete a workout
const deleteWorkout = async (req, res) =>{
    const {id}=req.params //gets id from route parameters

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error : 'No such workout found'})
    }

    const workout= await Workout.findOneAndDelete({_id : id})
    if(!workout){
        return res.status(404).json({error : 'Not found by id'})
    }
    res.status(200).json (workout)
}

//update a workout
const updateWorkout =async (req, res) =>{
    const {id}=req.params //gets id from route parameters

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error : 'No such workout found'})
    }

    const workout= await Workout.findOneAndUpdate({_id : id}, {
        ...req.body
    })
    if(!workout){
        return res.status(404).json({error : 'Not found by id'})
    }
    res.status(200).json (workout)
}

//export

module.exports= {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}