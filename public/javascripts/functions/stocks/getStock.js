var fetch = require('node-fetch');

const getStock = (name) => {
    const url = "https://api.iextrading.com/1.0/stock/"+name+"/batch?types=quote&range=1m&last=10";
    return new Promise((resolve, reject) => {
    	fetch(url)
    	.then(res => res.json())
    	.then(data => resolve(data.quote));
    });
}

module.exports = getStock;