var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
    res.render('clans', {loggedIn: req.session.loggedIn});
});

module.exports = router;