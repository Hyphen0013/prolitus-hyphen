const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

const { forwardAuthenticated } = require('../../config/auth');

// Load user model
const User = require('../../models/user')

router.get('/login', forwardAuthenticated, (req, res) => {
    res.render('pages/login.ejs',
    { user: req.user })
});


router.get('/register', forwardAuthenticated, (req, res) => {
    res.render('pages/register', 
    { user: req.user });
});

router.post('/register', (req, res) => {
    console.log( req.body)

    const { name, email, password, password2 } = req.body;
    let errors = [];

    if (!name || !email || !password || !password2) {
        errors.push({ msg: 'Please enter all fields' });
    }

    if (password != password2) {
        errors.push({ msg: 'Passwords do not match' });
    }

    if (password.length < 6) {
        errors.push({ msg: 'Password must be at least 6 characters' });
    } 
    
    if (errors.length > 0 ) {
        res.render('pages/register', {
            errors,
            name,
            email,
            password,
            password2
        });
    } 
    else {
        User.findOne({ email: email }).then(user => {
            if (user) {
                errors.push({ msg: 'Email already exists' });
                res.render('pages/register', {
                    errors,
                    name,
                    email,
                    password,
                    password2
                    
                });
            } else {
                const newUser = new User({
                    name,
                    email,
                    password
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(user => {
                                req.flash('success_msg', 'You are now registered and can log in');
                                res.redirect('/users/login')
                            })
                            .catch(err => console.log(err));
                    });
                });
            }
        });
    }
});

// Login
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

router.get('/logout', (req, res, next) => {
    req.logout();
    req.flash('success_msg', 'Logged out');
    res.redirect('/users/login');
});

module.exports = router;