const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars')
const path = require('path');
const passport = require('passport');
const session = require('express-session')
const MongoStore = require('connect-mongo')(session);
const connectDB = require('./config/db');
const { MongooseDocument } = require('mongoose');

//load config 
dotenv.config();
require('./config/passport')(passport);
connectDB();

const app = express();

//body parser
app.use(express.urlencoded({extended: false}));
app.use(express.json());
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
    dotenv.config({path: './confiq/config.env'});

}
//handlebars
app.engine('.hbs', exphbs({defaultLayout: 'main' , 'extname' : '.hbs'}));
app.set('view engine', '.hbs');

//session middleware
app.use(session({
    secret: 'keyboard cat',
    resave: false, //we dont want to save a session if nothing is modified
    saveUninitialized: false, //dont create session until something is stored
   store : new MongoStore({mongooseConnection : mongoose.connection})
}))

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());


//static folder
app.use(express.static(path.join(__dirname,'public')));
//routes
app.use('/',require('./routes/index.js'));
app.use('/auth', require('./routes/auth'));
app.use('/stories', require('./routes/stories'));

const PORT = process.env.PORT ||  3000;

app.listen(PORT, console.log(`SERVER Running in ${process.env.NODE_ENV} mode on ${PORT}`));

