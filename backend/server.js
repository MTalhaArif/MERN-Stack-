require('dotenv').config(); // to access environment variable in env file
const express= require ('express');

//express app
const app= express();
const workoutRouter= require('./routes/workouts');
const userRoutes= require('./routes/user');
const mongoose = require('mongoose')

//middleware
app.use(express.json()); // used to send post to request object


app.use((req, res, next)=>{
    console.log(req.path, req.method);
    next();
})

//routes
app.use('/api/workouts',workoutRouter); // using router defined in the routes folder
app.use('/api/user',userRoutes);

//connecting to db
mongoose.connect(process.env.MONG_URI)
.then(()=>{
//listening to port 
app.listen(process.env.PORT, ()=>{
    console.log('connected to db and listening to port ' + process.env.PORT)
})
})
.catch((error)=>{
    console.log(error);
})

