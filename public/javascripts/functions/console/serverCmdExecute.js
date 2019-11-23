const uuidName = require('../uuidName.js');
const checkSrvItem = require('../inventory/checkSrvItem.js');
const setSrvExecuted = require('../server/setSrvExecuted.js');
const query = require('../../database/dbquery.js');

const serverCmdExecute = async(req, cmd, command, callback) => {
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
            if(results[0].executedSoftware.length > 0) {
                var itemname = await uuidName.toItemName(results[0].executedSoftware);
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
