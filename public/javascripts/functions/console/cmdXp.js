var checkAdmin = require('../checkAdmin.js');
var setXp = require('../leveling/setXP.js');
var uuidName = require('../uuidName.js');
var query = require('../../database/dbquery.js');
var handleXP = require('../leveling/xpHandler.js');

function cmdXp(req, cmd, command, callback) {
    checkAdmin(req.session.uuid, function(calla) {
        if(calla) {
            if(command[1] != "" && command[2] != "" && command[3] != "") {
                var opName = command[2];
                var operation = command[1];
                var opXp = parseInt(command[3]);
    
                uuidName.toUuid(opName, function(recuuid) {
    
                    var sql = "SELECT xp FROM levels WHERE uuid='" + recuuid + "';";
                    query(sql, function(results) {
                        if(results <= 0) {
                            callback();
                        } else {
                            var targetXp = parseInt(results[0].xp);
    
                            switch(operation) {
                                case "give":
                                    if(opXp <= 100000 && opXp > 0) {
                                        var newGiveXp = parseInt(targetXp + opXp);
                                        setXp(recuuid, newGiveXp, function() {
                                            req.session.command_log += "Added " + opXp + " xp to " + opName + "\n";
                                            callback();
                                        });
                                    } else {
                                        req.session.command_log += "You can't give more than 100000 xp at one time\n";
                                        callback();
                                    }
                                    break;
                                case "set":
                                    if(opXp >= 0) {
                                        var newSetXp = parseInt(opXp);
                                        setXp(recuuid, newSetXp, function() {
                                            req.session.command_log += "Set " + opName + " xp to " + opXp + "\n";
                                            callback();
                                        });
                                    } else {
                                        req.session.command_log += "Can't set " + opName + " xp to be under 0\n";
                                        callback();
                                    }
                                    break;
                                case "take":
                                    if(targetXp <= 0 && (targetXp - opXp) < 0) {
                                        req.session.command_log += "Can't take more than xp to be under 0\n";
                                    } else {
                                        var newTakeXp = parseInt(targetXp - opXp);
                                        setXp(recuuid, newTakeXp, function() {
                                            req.session.command_log += "Took " + opXp + " xp from " + opName + "\n";
                                            callback();
                                        });
                                    }
                                    break;
                                default:
                                    req.session.command_log += "You need to specify a operation [give, set, take]\n";
                                    break;
                            }
                        }
                    });
                });
            } else {
                callback();
            }
        } else {
            req.session.command_log += "You are not an admin!\n";
            callback();
        }
    });
}

module.exports = cmdXp;
