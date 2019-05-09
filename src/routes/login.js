const User = require('../models/user'),
 bcrypt = require('bcrypt'),
 jwt = require('jsonwebtoken')

 const postLogin = async(req, res)=>{
  console.log(req.body)
  try {
   const userdb = await User.findOne({email: req.body.email})
   if (!userdb) {
    return res.status(400).send({ok: false, err: `invalid email`})
   }
   if (!bcrypt.compareSync(req.body.password, userdb.password)) {
    return res.status(400).send({ok: false, err:'pass invalid'})
   }else{
   console.log(userdb)
   const token = jwt.sign({user: userdb}, process.env.SECRET_TOKEN, {expiresIn: '7d'})
   return res.status(200).send({
    ok: true,
    user: userdb,
    token
   })
  }
  } catch (e) {
   return res.status(500).send({ok: false, err: e.message})
  }
 }

 module.exports= {
  postLogin
 }