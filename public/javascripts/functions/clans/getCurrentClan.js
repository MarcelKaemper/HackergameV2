var query = require('../../database/dbquery.js');

const currentClan = (uuid) => {
    return new Promise(async(resolve, reject) => {
        let clan = await query("SELECT memberOf FROM userdata WHERE uuid='"+uuid+"';");
        resolve(clan[0].memberOf);
    });
}

module.exports = currentClan;