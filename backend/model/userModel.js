const validator = require('validator')

const mongoose = require('mongoose')

const bcrypt = require ('bcrypt');

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})

//static sign-up method
userSchema.statics.signup = async function (email, password){
//validation

  if(!email || !password){
    throw Error('All fields must be filled')
  }
  if(!validator.isEmail (email)){
    throw Error('Invalid Email !')
  }
  if(!validator.isStrongPassword(password)){
    throw Error('Not a strong password')
  }

  const exists = await this. findOne({email})
  if (exists)
  {
    throw Error('Email already exists')
  }
  //hashing the password
  //generating salt
  const salt = await bcrypt.genSalt(10)

  const hash = await bcrypt.hash(password, salt)

  const user = await this.create({email, password : hash})

  return user
}

//static user login
userSchema.statics.login = async function (email, password){
  //validation

  if(!email || !password){
    throw Error('All fields must be filled')
  }
  const user = await this. findOne({email})
  if (!user){
    throw Error('incorrect Email')
  }
  //authenticate password
  const match = await bcrypt.compare(password, user.password)

  if(!match){
    throw Error ('Incorrect Password')
  }
  return user}




module.exports = mongoose.model('User', userSchema)