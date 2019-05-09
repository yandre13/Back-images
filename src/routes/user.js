const User = require('../models/user'),
 bcrypt = require('bcrypt'),
 cloudinary = require('cloudinary'),
 path = require('path'),
 fs = require('fs')

 cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
  api_secret: process.env.CLOUDINARY_CLOUD_API_SECRET
 })


const getUsers = async(req, res)=>{
 try {
  const usersdb = await User.find({active: true}).sort('name'),
  count = await User.countDocuments({active: true})
  return res.status(200).send({
   ok: true,
   users: usersdb,
   count
  })
 } catch (e) {
  console.log(e.message)
  return res.status(500).send({
   ok: false,
   err: e.message
  })
 }
}

const postUser = async(req, res)=>{
 try {
   const user = new User({
    name: req.body.name,
    lastname: req.body.lastname,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10)
   })
   await user.save()
 
   return res.status(200).send({ok: true, user})
 } catch (e) {
  console.log(e)
  return res.status(500).send({ok: false, err: e.msg})
 }
}

module.exports = {
 getUsers,
 postUser
}