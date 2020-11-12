const path = require('path')
const exphbs = require('express-handlebars')
const express = require('express')
const bodyParser = require('body-parser')
const connectDB = require('./config/db.js')
connectDB()
const app = express()






app.use(express.static(path.join(__dirname, 'public')))
app.engine('.hbs', exphbs({
    extname: '.hbs',
    partialsDir: 'views/layouts/partials',
    defaultLayout: 'main'
}))
app.set('view engine', '.hbs');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))




app.use('/dashboard', require('./routes/dashboard.js'))
app.use('/', require('./routes/client.js'))

let ConsoleClock = new Date()
app.listen(8080, console.log(`server started at ${ConsoleClock.getHours()}:${ConsoleClock.getMinutes()}:${ConsoleClock.getSeconds()}`))