const checkIP = require('../checkIP.js');
const checkIfCorrect = require('../server/checkIfCorrect.js');
const checkExtend = require('../checkExtend.js');

const cmdServer = (req, cmd, command) => {
    return new Promise(async(resolve, reject) => {
        var operation = command[1];
        var target = command[2];
        var targetpw = command[3];

        switch(operation) {
            case "connect":
                if(target != "" || target != undefined || target != null) {
                    var calla = await checkIP(target);
                    if(calla) {
                        var trueip = await checkExtend.IP(target);
                        if(trueip) {
                            var recown = await checkIfCorrect(req, target, targetpw);
                            if(recown) {
                                req.session.boolConToSrv = true;
                                req.session.conToSrv = target;

                                req.session.command_log += "Connected to " + target + "!\n";
                                resolve();
                            } else {
                                req.session.command_log += "Wrong credentials!\n";
                                resolve();
                            }
                        } else {
                            req.session.command_log += "Not found!\n";
                            resolve();
                        } 
                    } else {
                        req.session.command_log += "Invalid ip address!\n";
                        resolve();
                    }
                } else {
                    req.session.command_log += "You need to specify a target!\n";
                    resolve();
                }
                break;
            default:
                req.session.command_log += "You need to specify a operation [connect]!\n";
                resolve();
                break;
        }
    });
}

module.exports = cmdServer;
