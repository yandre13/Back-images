const jwt = require('jsonwebtoken')



const verifyToken = (req, res, next) => {
 let token = req.get('token')
 jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
     if (err) {
         return res.status(401).json({
             ok: false,
             message: 'Token no válido'
         })
     }
     req.user = decoded.user
     next()
 })
}

module.exports = {verifyToken}