const fetch = require('node-fetch');
const secret = require('../secret.js');

const getStock = (name) => {
    const url = "https://finnhub.io/api/v1/quote?symbol=" + name + "&token=" + secret._API._KEY;
    return new Promise((resolve, reject) => {
    	fetch(url)
    	.then(res => res.json())
    	.then(data => resolve(data["c"]));
    });
}

const getCompanyName = (name) => {
    const url = "https://finnhub.io/api/v1/stock/profile2?symbol=" + name + "&token=" + secret._API._KEY;
    return new Promise((resolve, reject) => {
    	fetch(url)
    	.then(res => res.json())
        .then(data => resolve(data["name"]));
        //.then(data => resolve("N/A"));
    });
}

module.exports = {
    getStock,
    getCompanyName
};
