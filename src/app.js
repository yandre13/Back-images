const express = require('express'),
 app = express(),
 router = require('./routes'),
 fileUpload = require('express-fileupload'),
 cors = require('cors')



 app.set('port', process.env.PORT || 3003)

 .use(cors())


 .use(express.json())
 .use(express.urlencoded({extended:false}))
 .use(fileUpload())
 .use('/api', router)
 //Static
 .use(express.static(`${__dirname}/public`))

module.exports =app