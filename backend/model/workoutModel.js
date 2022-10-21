const mongoose = require( 'mongoose' );

// create a new schema

const Schema = mongoose.Schema;
const workoutSchema= new Schema({
    title : {
        type: String,
        required : true
    },
    reps : {
        type : Number,
        required : true
    },
    load : {
        type : Number,
        required : true
    },
    user_id : {
        type : String,
        required : true
    }
}, {timestamps : true})

//making a model for this schema
module.exports= mongoose.model('Workout',workoutSchema);