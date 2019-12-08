const query = require('../../database/dbquery.js');

const joinClan = (clan_uuid, clan_name, uuid, name, currentMemberCount, maxMembers) => {
    return new Promise(async(resolve, reject) => {
        let currentClan = await query("SELECT memberOf FROM userdata WHERE uuid='" + uuid + "';");

        if(!currentClan[0].memberOf) {
            if(currentMemberCount < maxMembers) {
                let clan = await query("SELECT * FROM clans WHERE uuid='" + clan_uuid + "';");
                let members = JSON.parse(clan[0].members);
                members["names"].push(name);
                members["uuids"].push(uuid);
                //Add memberCount
                await query("UPDATE clans SET memberCount=memberCount+1 WHERE uuid='" + clan_uuid + "';");
                //Add user to member array
                await query("UPDATE clans SET members='" + JSON.stringify(members) + "' WHERE uuid='" + clan_uuid + "';");
                //Update userdata clan
                await query("UPDATE userdata SET memberOf='" + clan_name + "' WHERE uuid='" + uuid + "';");
                resolve(true);
            } else {
                resolve(false);
            }
        } else {
            resolve(false);
        }
    });
}

module.exports = joinClan;
