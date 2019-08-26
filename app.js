const express = require('express');
const path = require('path');
// const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const expressSession = require('express-session');
const flash = require('connect-flash');
const ejs = require('ejs');


const app = express();

// DB Configration
const database = require('./config/keys');

// Passport Config
require('./config/passport')(passport);

// Connection to MongoDB Compass
mongoose.connect(
        database.mongoURI,
        { useNewUrlParser: true },
        (err) => {
            if (err) throw err;
            else console.log('Connected to MongoDB...')
        } 
    )

// Static public folder
app.use(express.static('./public'));

// EJS Engine
// app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
    expressSession({
        secret: 'hyphen.call', // create sid in http req. have'nt cookie
        resave: true, // save sid for further req.
        saveUninitialized: true // depend on thin property it store the session store
    })
)

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global Variables
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
  });

// Routes to pages
app.use('/', require('./routes/pages/index.js'));
app.use('/users', require('./routes/pages/users'));

app.listen(database.PORT, () => {
    console.log(`Server is running on port: ${database.PORT}`);
});




