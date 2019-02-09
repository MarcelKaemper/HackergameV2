var express = require('express');
var router = express.Router();
var stdParameter = require('../public/javascripts/functions/stdParameter.js');
var stdCall = require('../public/javascripts/functions/stdCall.js');

router.get('/', (req, res, next) => {
    stdCall(req);
    res.render('clan', stdParameter(req, 'Clans', {clans:{"cool":{members:12}}}));
});

module.exports = router;