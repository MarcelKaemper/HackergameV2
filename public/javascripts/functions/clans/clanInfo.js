const query = require('../../database/dbquery.js');

const clanInfo = (name) => {
    if(name != ""){
        return new Promise(async(resolve, reject) => {
            let clanUuid = await query("SELECT uuid FROM clans WHERE name='"+name+"';");
            let clanInfo = await query("SELECT * FROM clans WHERE uuid='"+clanUuid[0].uuid+"';");
            let members = JSON.parse(clanInfo[0].members);
            resolve(members.names);
        });
    }
}

module.exports = clanInfo;