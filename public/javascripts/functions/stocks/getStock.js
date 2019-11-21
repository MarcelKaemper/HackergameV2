const fetch = require('node-fetch');
const secret = require('../../../../secret.js');

const getStock = (name) => {
    const url = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol="+name+"&apikey="+secret.apiKey;
    return new Promise((resolve, reject) => {
    	fetch(url)
    	.then(res => res.json())
    	.then(data => console.log(data["Global Quote"].price));
    });
}

module.exports = getStock;