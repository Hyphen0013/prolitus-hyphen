const express = require('express');
const router = express.Router();


// Welcome Page
router.get('/', (req, res) => {
    res.render('pages/welcome.ejs', 
        { title: 'Welcome page' }
    );
    
});

module.exports = router;

