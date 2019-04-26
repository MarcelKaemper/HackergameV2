var express = require('express');
var router = express.Router();
var stdCall = require('../public/javascripts/functions/stdCall.js');
var stdParameter = require('../public/javascripts/functions/stdParameter.js');
var getStock = require('../public/javascripts/functions/stocks/getStock.js');
var buyStock = require('../public/javascripts/functions/stocks/buyStock.js');
var loadStocks = require('../public/javascripts/functions/stocks/loadStocks.js');
var sellStock = require('../public/javascripts/functions/stocks/sellStock.js');


router.get('/', async function (req, res, next) {
	await stdCall(req);
	if (req.session.loggedIn) {
		var ownedStocks = await loadStocks(req.session.uuid);
	}
	res.render('stocks/stocks', stdParameter(req, 'Stocks', { money: req.session.money, ownedStocks: ownedStocks }));
});

router.post('/getStocks', async (req, res, next) => {
	await stdCall(req);
	let info = await getStock(req.body.stockName, "symbol,companyName,latestPrice");
	res.render('stocks/stocks', stdParameter(req, 'Stocks', { buyable: parseInt(Math.floor(req.session.money / Math.round(info.latestPrice))), price: parseInt(Math.round(info.latestPrice)), company: info.companyName, symbol: info.symbol }));
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