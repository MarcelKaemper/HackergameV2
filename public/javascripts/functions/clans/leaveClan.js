const query = require('../../database/dbquery.js');

const leaveClan = (req) => {
    return new Promise(async(resolve, reject) => {
        await query("DELETE memberOf FROM userdata WHERE uuid='" + req.session.uuid + "';");
        let clan = await query("SELECT * FROM clans WHERE name='" + req.session.clan + "';");

        let members = JSON.parse(clan[0].members);
        let index_name = members['names'].indexOf(req.session.name);
        let index_uuid = members['uuids'].indexOf(req.session.uuid);
        members['names'].splice(index_name, 1);
        members['uuids'].splice(index_uuid, 1);
        //Sub memberCount
        await query("UPDATE clans SET memberCount=memberCount-1 WHERE uuid='" + clan[0].uuid + "';");
        //Remove user from member array
        await query("UPDATE clans SET members='" + JSON.stringify(members) + "' WHERE uuid='" + clan[0].uuid + "';");
        //Update userdata clan
        await query("UPDATE userdata SET memberOf='' WHERE uuid='" + req.session.uuid + "';");
        let memberCount = await query("SELECT memberCount FROM clans WHERE uuid='" + clan[0].uuid + "';");
        if(parseInt(memberCount[0].memberCount) <= 0) {
            await query("DELETE FROM clans WHERE uuid='" + clan[0].uuid + "';");
        }
        
        resolve(true);
    });
}

module.exports = leaveClan;
