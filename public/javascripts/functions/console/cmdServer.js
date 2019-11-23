const checkIP = require('../checkIP.js');
const checkIfCorrect = require('../server/checkIfCorrect.js');
const checkExtend = require('../checkExtend.js');

const cmdServer = (req, cmd, command, callback) => {
    var operation = command[1];
    var target = command[2];
    var targetpw = command[3];

    switch(operation) {
        case "connect":
            if(target != "" || target != undefined || target != null) {
                checkIP(target, async(calla) => {
                    if(calla) {
                        var trueip = await checkExtend.IP(target);
                        if(trueip) {
                            var recown = await checkIfCorrect(req, target, targetpw);
                            if(recown) {
                                req.session.boolConToSrv = true;
                                req.session.conToSrv = target;

                                req.session.command_log += "Connected to " + target + "!\n";
                                callback();
                            } else {
                                req.session.command_log += "Wrong credentials!\n";
                                callback();
                            }
                        } else {
                            req.session.command_log += "Not found!\n";
                            callback();
                        } 
                    } else {
                        req.session.command_log += "Invalid ip address!\n";
                        callback();
                    }
                });
            } else {
                req.session.command_log += "You need to specify a target!\n";
                callback();
            }
            break;
        default:
            req.session.command_log += "You need to specify a operation [connect]!\n";
            callback();
            break;
    }
}

module.exports = cmdServer;
