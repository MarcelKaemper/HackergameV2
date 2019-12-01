const checkAdmin = require('../checkAdmin.js');
const uuidName = require('../uuidName.js');
const setXp = require('../leveling/setXP.js');

const cmdXp = (req, cmd, command) => {
    return new Promise(async(resolve, reject) => {
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
                    resolve();
                } else {
                    switch(operation) {
                        case "give":
                            await setXp(recuuid, opXp, "give");
                            req.session.command_log += "Added " + opXp + " to " + opTarget + "\n";
                            resolve();
                            break;
                        case "set":
                            await setXp(recuuid, opXp, "set");
                            req.session.command_log += "Set " + opTarget + " xp to " + opXp + "\n";
                            resolve();
                            break;
                        case "take":
                            await setXp(recuuid, opXp, "take");
                            req.session.command_log += "Took " + opXp + " from " + opTarget + "\n";
                            resolve();
                            break;
                        case "show":
                            var resarr = await setXp(recuuid, 0, "show");
                            req.session.command_log += "Name: " + resarr["name"] + "\n";
                            req.session.command_log += "Level: " + resarr["level"] + "\n";
                            req.session.command_log += "XP: " + resarr["xp"] + "\n";
                            resolve();
                            break;
                        default:
                            req.session.command_log += "You need to specify a operation [give|set|take]\n";
                            resolve();
                            break;
                    }
                }
            } else {
                req.session.command_log += "Please enter a username\n";
                resolve();
            }
        } else {
            req.session.command_log += "You are not an admin!\n";
            resolve();
        }
    });
}

module.exports = cmdXp;
