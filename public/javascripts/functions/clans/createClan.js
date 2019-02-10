var query = require('../../database/dbquery.js');
var loadClans = require('./loadClans.js');
var generator = require('../generator.js');

const createClan = (uuid, name, maxMembers, username) => {
    return new Promise(async(resolve, reject) => {
        let existingClans = await loadClans();
        console.log(typeof existingClans);
        console.log(existingClans);
        for(let item of existingClans){
            if(item.name == name){
                resolve(false);
            }
        }
        let clan_uuid = await generator.genUUID();
        let values = "('"+clan_uuid+"','"+name+"', 1, "+maxMembers+",' {[\""+username+"\"],[\""+uuid+"\"]}');";

        await query("INSERT INTO clans(uuid,name,memberCount,maxMembers,members) VALUES "+values);
        resolve(true);
    });
}

module.exports = createClan;