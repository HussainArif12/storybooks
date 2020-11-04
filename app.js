const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const exphbs = require('express-handlebars')
const path = require('path');
const passport = require('passport');
const session = require('express-session')
const connectDB = require('./config/db');

//load config 
dotenv.config({path: './confiq/config.env'});
require('./config/passport')(passport);
connectDB();

const app = express();

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
//handlebars
app.engine('.hbs', exphbs({defaultLayout: 'main' , 'extname' : '.hbs'}));
app.set('view engine', '.hbs');

//session middleware
app.use(session({
    secret: 'keyboard cat',
    resave: false, //we dont want to save a session if nothing is modified
    saveUninitialized: false //dont create session until something is stored
}))

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());


//static folder
app.use(express.static(path.join(__dirname,'public')));
//routes
app.use('/',require('./routes/index.js'));

const PORT = process.env.PORT ||  3000;

app.listen(PORT, console.log(`SERVER Running in ${process.env.NODE_ENV} mode on ${PORT}`));

