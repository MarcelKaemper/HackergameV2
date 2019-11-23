const fetch = require('node-fetch');

const getStock = (name) => {
    const url = "https://financialmodelingprep.com/api/v3/stock/real-time-price/"+name;
    return new Promise((resolve, reject) => {
    	fetch(url)
    	.then(res => res.json())
    	.then(data => resolve(data["price"]));
    });
}

const getCompanyName = (name) => {
    const url = "https://financialmodelingprep.com/api/v3/company/profile/"+name;
    return new Promise((resolve, reject) => {
    	fetch(url)
    	.then(res => res.json())
    	.then(data => resolve(data["profile"]["companyName"]));
    });
}

module.exports = {
    getStock,
    getCompanyName
};