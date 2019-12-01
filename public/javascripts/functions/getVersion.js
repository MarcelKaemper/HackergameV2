// const fetch = require('node-fetch');
var query = require('../database/dbquery.js');

const getVersion = () => {
    // const url = "https://api.github.com/repos/marcelkaemper/HackergameV2/releases";
    return new Promise(async(resolve, reject) => {
        var sql = "SELECT version FROM gameversion WHERE id=1;";
        var result = await query(sql);
    	// fetch(url)
    	// .then(res => res.json())
        // .then(data => resolve(data[0]["name"]));
        resolve(result[0].version);
    });
}

module.exports = getVersion;
