const express = require('express');
const router = express.Router();
const stdCall = require('../public/javascripts/functions/stdCall.js');
const stdParameter = require('../public/javascripts/functions/stdParameter.js');
const getStock = require('../public/javascripts/functions/stocks/getStock.js');
const buyStock = require('../public/javascripts/functions/stocks/buyStock.js');
const loadStocks = require('../public/javascripts/functions/stocks/loadStocks.js');
const sellStock = require('../public/javascripts/functions/stocks/sellStock.js');
const getUserInfo = require('../public/javascripts/functions/getUserInfo.js');


router.get('/', async function (req, res, next) {
	await stdCall(req);
	if (req.session.loggedIn) {
		var ownedStocks = await loadStocks(req.session.uuid);
	}
	res.render('stocks/stocks', stdParameter(req, 'Stocks', { money: req.session.money, ownedStocks: ownedStocks, user: await getUserInfo(req) }));
});

router.post('/getStocks', async (req, res, next) => {
	await stdCall(req);
	let info = await getStock(req.body.stockName);
	let price = info;
	console.log(price);
	res.render('stocks/stocks', stdParameter(req, 'Stocks', { buyable: parseInt(Math.floor(req.session.money / Math.round(price))), price: parseInt(Math.round(price)), companyName: "", symbol: price, user: await getUserInfo(req) }));
})

router.post('/buystock', async (req, res, next) => {
	let count;
	req.body.count <= 0 ? count = req.body.buyable : count = req.body.count;
	await buyStock(req.session.uuid, req.body.symbol, Math.round(req.body.price), parseInt(count));
	res.redirect('/stocks');
})

router.post('/sellstock', async (req, res, next) => {
	if (!req.body.confirmed) {
		// If no specific amount is set, sell all
		req.body.amount <= 0 ? req.body.amount = req.body.count : req.body.amount = req.body.amount;
		// Get the latest price & multiply to get the overall price
		let newPrice = await getStock(req.body.symbol, "latestPrice");
		newPrice = parseInt(Math.round(newPrice.latestPrice)) * parseInt(req.body.amount);
		//Render page with given parameters
		res.render('stocks/sellstock', stdParameter(req, 'Sell Stocks', {
			price: req.body.spent / req.body.count * req.body.amount,
			symbol: req.body.symbol,
			count: req.body.amount,
			newprice: newPrice
		}))
	} else {
		await sellStock(req.session.uuid, req.body.symbol, req.body.count, req.body.worth);
		res.redirect('/stocks');
	}

})

module.exports = router;