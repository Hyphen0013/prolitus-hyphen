const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const expressSession = require('express-session');
const flash = require('connect-flash');


const app = express();

// DB Configration
const database = require('./config/keys');

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
app.use(expressLayouts);
app.set('view engine', 'ejs');


// Express body parser
app.use(express.urlencoded({ extended: true }));


// Global Variables
/* app.use(function(req, res, next) {
    res.locals.error = req.flash('error');
    next();
}); */

// Routes to pages
app.use('/', require('./routes/pages/index.js'));
app.use('/', require('./routes/pages/users'));

app.listen(database.PORT, () => {
    console.log(`Server is running on port: ${database.PORT}`);
});




