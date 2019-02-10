var query = require('../../database/dbquery.js');

const loadClans = () => {
    return new Promise(async(resolve, reject) => {
        let clans = await query("SELECT * FROM clans");
        resolve(clans);
    });
}

module.exports = loadClans;