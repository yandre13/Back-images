const Image = require('../models/image'),
 cloudinary = require('cloudinary'),
 path = require('path'),
 fs = require('fs')

 cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
  api_secret: process.env.CLOUDINARY_CLOUD_API_SECRET
 })

 /* const getImages = async(req, res)=>{
  try {
   const imagesdb = await Image.find()
   return res.status(200).send({
    ok: true,
    imagesdb: imagesdb.reverse()
   })
  } catch (e) {
   return res.status(400).send({
    ok: false,
    msg: e.message
   })
  }
 } */
 const getImages = async(req, res)=>{
  try {
    const id = req.params.id
   const imagesdb = await Image.find({user:id})
   console.log(id)
   console.log(imagesdb)
   return res.status(200).send({
    ok: true,
    imagesdb: imagesdb.reverse()
   })
  } catch (e) {
   return res.status(400).send({
    ok: false,
    msg: e.message
   })
  }
 }

 const getImagesHome = async(req, res)=>{
  try {
   const imagesdb = await Image.find(),
   images = imagesdb.slice(-4).reverse()
   return res.status(200).send({
    ok: true,
    images
   })
  } catch (e) {
   return res.status(400).send({
    ok: false,
    msg: e.message
   })
  }
 }

 const getImagesHomeById = async(req, res)=>{
  try {
    const id = req.params.id
   const imagesdb = await Image.find({user: id}).populate('user', 'email name'),
   images = imagesdb.slice(-4).reverse()
   return res.status(200).send({
    ok: true,
    images
   })
  } catch (e) {
   return res.status(400).send({
    ok: false,
    msg: e.message
   })
  }
 }


 const getImagesSearch = async(req, res)=>{
  try {
   const entry = req.params.entry,
    regexp = new RegExp(entry, 'i')
    const imagesdb = await Image.find({title: regexp}).sort('title')
    return res.status(200).send({
     ok: true,
     imagesdb
    })
  } catch (e) {
   return res.status(400).send({
    ok: false,
    msg: e.message
   })
  }
 }

 const postImage = async(req, res)=>{
  try {
    console.log(req.body)
   const image = req.files.image,
   ext = path.extname(image.name),
   validExts = ['.png', '.jpg', '.jpeg', '.gif', '.mp4']
   if (validExts.includes(ext)) {
    const name = image.name.replace(ext, `-${Date.now()}${ext}`)
    await image.mv(path.resolve(__dirname, `../public/images/uploads/${name}`))
    const result = await cloudinary.v2.uploader.upload(path.resolve(__dirname, `../public/images/uploads/${name}`))
    const imagedb = new Image({
     title: req.body.title,
     description: req.body.description,
     imageURL: result.secure_url,
     user: req.body.user
    })
    await imagedb.save()
    fs.unlinkSync(path.resolve(__dirname, `../public/images/uploads/${name}`))
    return res.status(200).send({ok: true})
   }else{
    return res.status(400).send({ok: false, msg:`invalid file`})
   }
  } catch (e) {
   console.log(e)
  }
 }

 const deleteImage = async(req, res)=>{
  try {
    const id = req.params.id,
   imagedb = await Image.findByIdAndDelete(id),
   result = await cloudinary.v2.uploader.destroy(imagedb.imageURL)
   console.log(id)
   console.log(result)
   return res.send({
     ok: true,
     msg: 'deleted'
   })
  } catch (e) {
    console.log(e.message)
    return res.send({
      ok: true,
      msg: `${e.message}`
    })
  }
 }








 module.exports = {
   getImages,
   getImagesHome,
   getImagesHomeById,
   getImagesSearch,
   postImage,
   deleteImage
 }