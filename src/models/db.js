const {connect} = require('mongoose')

const connectDB = async()=>{

 console.log(process.env.MONGODB_URI)
 try {
  await connect(process.env.MONGODB_URI, {useNewUrlParser: true})
  console.log('Db is connected')
 } catch (e) {
  console.log(e)
 }
 
}

module.exports = connectDB
