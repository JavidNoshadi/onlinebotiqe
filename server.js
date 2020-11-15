const path = require('path')
const exphbs = require('express-handlebars')
const express = require('express')
const bodyParser = require('body-parser')
const connectDB = require('./config/db.js')
var flash = require('connect-flash');
const session = require('express-session')
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
const User = require('./config/User.js')
connectDB()
const app = express()


app.use(session({
    secret: 'javidity.ir',
    saveUninitialized: true,
    resave: true
}));

app.use(flash());


app.use(express.static(path.join(__dirname, 'views/public')))
app.engine('.hbs', exphbs({
    extname: '.hbs',
    partialsDir: 'views/layouts/partials',
    defaultLayout: 'main'
}))
app.set('view engine', '.hbs');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(passport.initialize());
app.use(passport.session());


app.use('/dashboard', require('./routes/dashboard.js'))
app.use('/', require('./routes/client.js'));

let ConsoleClock = new Date()
app.listen(8080, console.log(`server started at ${ConsoleClock.getHours()}:${ConsoleClock.getMinutes()}:${ConsoleClock.getSeconds()}`))