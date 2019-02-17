var uuidName = require('../uuidName.js');
var checkSrvItem = require('../inventory/checkSrvItem.js');
var setSrvExecuted = require('../server/setSrvExecuted.js');
var query = require('../../database/dbquery.js');

async function serverCmdExecute(req, cmd, command, callback) {
    var srvuuid = await uuidName.toSrvUuid(req.session.conToSrv);
    var operation = command[1];
    var iteminput = command[2];
    var itemuuid = await uuidName.toItemUuid(iteminput);

    switch(operation) {
        case "software":
            if(iteminput != "" && iteminput != null || iteminput != undefined) {
                var checkitem = await checkSrvItem(srvuuid, itemuuid);
                if(checkitem) {
                    await setSrvExecuted(srvuuid, itemuuid);
                    req.session.command_log += "Executed " + iteminput + "!\n";
                } else {
                    req.session.command_log += "Software not found!\n";
                }
            } else {
                req.session.command_log += "Software not found!\n";
            }
            break;
        case "show":
            var sql = "SELECT executedSoftware FROM server WHERE uuid='" + srvuuid + "';";
            var results = await query(sql);
            if(results.length > 0) {
                var itemname = await uuidName.toItemName(itemuuid);
                req.session.command_log += "Executed software: " + itemname + "\n";
            } else {
                req.session.command_log += "There is no executed software on this server!\n";
            }
            break;
        default:
            req.session.command_log += "You need to specify a operation [software|show]!\n";
            break;
    }

    callback();
}

module.exports = serverCmdExecute;
