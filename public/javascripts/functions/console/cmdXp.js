var checkAdmin = require('../checkAdmin.js');
var uuidName = require('../uuidName.js');
var setXp = require('../leveling/setXP.js');

async function cmdXp(req, cmd, command, callback) {
    var calla = await checkAdmin(req.session.uuid);
    if(calla) {
        var operation = command[1];
        var opTarget = command[2];
        var opXp = command[3];
        if(opXp == undefined || opXp == null) {
            opXp = 0;
        }
        if(opTarget == undefined || opTarget == null) {
            opTarget = req.session.name;
        }

        if(opTarget != "") {
            var recuuid = await uuidName.toUuid(opTarget);
            if(recuuid <= 0) {
                req.session.command_log += "User not found!\n";
                callback();
            } else {
                switch(operation) {
                    case "give":
                        await setXp(recuuid, opXp, "give");
                        req.session.command_log += "Added " + opXp + " to " + opTarget + "\n";
                        callback();
                        break;
                    case "set":
                        await setXp(recuuid, opXp, "set");
                        req.session.command_log += "Set " + opTarget + " xp to " + opXp + "\n";
                        callback();
                        break;
                    case "take":
                        await setXp(recuuid, opXp, "take");
                        req.session.command_log += "Took " + opXp + " from " + opTarget + "\n";
                        callback();
                        break;
                    case "show":
                        var resarr = await setXp(recuuid, 0, "show");
                        req.session.command_log += "Name: " + resarr["name"] + "\n";
                        req.session.command_log += "Level: " + resarr["level"] + "\n";
                        req.session.command_log += "XP: " + resarr["xp"] + "\n";
                        callback();
                        break;
                    default:
                        req.session.command_log += "You need to specify a operation [give, set, take]\n";
                        callback();
                        break;
                }
            }
        } else {
            req.session.command_log += "Please enter a username\n";
            callback();
        }
    } else {
        req.session.command_log += "You are not an admin!\n";
        callback();
    }
}

module.exports = cmdXp;
