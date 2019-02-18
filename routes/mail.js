var express = require('express');
var router = express.Router();
var stdParameter = require('../public/javascripts/functions/stdParameter.js');
var stdCall = require('../public/javascripts/functions/stdCall.js');

router.get('/', async(req, res, next) => {
    stdCall(req);
    res.render('mail/mail', stdParameter(req, 'Mail', {}));
});

module.exports = router;