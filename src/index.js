if (process.env.NODE_ENV !== 'production') {
 require('dotenv').config()
}
const app = require('./app'),
 db = require('./models/db'),
 c = console.log
 
 db()
 app.listen(app.get('port'), ()=>c(`Server on port ${app.get('port')}`))

