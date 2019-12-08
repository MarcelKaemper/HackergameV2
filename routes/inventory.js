const express = require('express');
const router = express.Router();
const stdParameter = require('../public/javascripts/functions/stdParameter.js');
const stdCall = require('../public/javascripts/functions/stdCall.js');
const getUserInfo = require('../public/javascripts/functions/getUserInfo.js');
const loadInventory = require('../public/javascripts/functions/inventory/loadInventroy.js');
const getItemData = require('../public/javascripts/functions/inventory/getItemData.js');

router.get('/', async(req, res, next) => {
    await stdCall(req);
	var getinventory = await loadInventory(req.session.uuid);
	var inventory = await getItemData(getinventory);
	res.render('inventory', stdParameter(req, 'Inventory', { inventory: inventory, user: await getUserInfo(req) }));
});

module.exports = router;
