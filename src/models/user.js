const {Schema, model} = require('mongoose'),
 userSchema = new Schema({
  name:{
   type: String,
   required: true
  },
  lastname:{
   type: String,
   required: true
  },
  email:{
   type: String,
   required: true
  },
  password:{
   type: String,
   required: true
  },
  google:{
   type: Boolean,
   default: false
  },
  image:{
   type: String,
   required: false
  },
  active:{
   type: Boolean,
   default: true
  }
 })


 userSchema.methods.toJSON = function () {
   const copy = this.toObject()
   delete copy.password
   return copy
 }

 module.exports = model('User', userSchema)