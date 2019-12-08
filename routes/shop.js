const express = require('express');
const router = express.Router();
const stdParameter = require('../public/javascripts/functions/stdParameter.js');
const stdCall = require('../public/javascripts/functions/stdCall.js');
const getUserInfo = require('../public/javascripts/functions/getUserInfo.js');
const listShop = require('../public/javascripts/functions/shop/listShop.js');
const buyShop = require('../public/javascripts/functions/shop/buyShop.js');
const sellShop = require('../public/javascripts/functions/shop/sellShop.js');

router.get('/', async(req, res, next) => {
	await stdCall(req);
	res.render('shop', stdParameter(req, 'Shop', { shoplist: await listShop(), message: req.query.error, user: await getUserInfo(req) }));
});

router.post('/buyshop', async(req, res, next) => {
	var success = await buyShop(req);
	if (success) {
		res.redirect('/shop');
	} else {
		res.redirect('/shop?error=buyFailed');
	}
});

router.post('/sellshop', async(req, res, next) => {
	await sellShop(req);
	res.redirect('/inventory');
});

module.exports = router;
