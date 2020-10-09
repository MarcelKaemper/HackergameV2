const fetch = require('node-fetch');
const secret = require('../secret.js');
const getStock = require('./getStock.js');
const query = require('../../database/dbquery')

const addDetails = async(name) => {
    let price = await getStock.getStock(name);

    // Get existing stockHistory
    var existing = await query("SELECT history FROM stockhistory WHERE symbol='" + name + "';");
    // Check if history exists
    if (existing.length > 0) {
        // Append to history
        console.log(existing[0].history);
        existing = JSON.parse(existing[0].history);
        existing[name][new Date().toLocaleString()] = price;
        await query("UPDATE stockhistory SET history='" + JSON.stringify(existing) + "' WHERE symbol='" + name + "';");
    } else {
        // Create if doesn't exist
        existing = {};
        existing[name] = {};
        existing[name][new Date().toLocaleString()] = price;
        await query("INSERT INTO stockhistory(symbol, history) VALUES ('" + name + "','" + JSON.stringify(existing) + "');");
    }

    console.log(price);
    console.log(existing);
}

const getDetails = (name) => {
    return new Promise(async(resolve, reject) => {
        var history = await query("SELECT history FROM stockhistory WHERE symbol='" + name + "';");
        resolve(history[0].history);
    })
}

module.exports = {
    getDetails,
    addDetails
};