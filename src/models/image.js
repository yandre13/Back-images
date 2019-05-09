const {Schema, model} = require('mongoose'),

 imageSchema = new Schema({
  title:{
   type:String,
   required: true
  },
  description:{
   type: String,
   required: true
  },
  imageURL:{
   type: String,
   required: true
  },
  user:{
   type: Schema.Types.ObjectId,
   ref: 'User'
  }
 })

 module.exports = model('Image', imageSchema)