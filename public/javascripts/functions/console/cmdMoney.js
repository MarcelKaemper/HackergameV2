const checkIP = require('../checkIP.js');
const query = require('../../database/dbquery.js');
const changeMoney = require('../changeMoney.js');
//const checkFirewall = require('./checkFirewall.js');

const cmdMoney = (req, cmd, command, callback) => {
    var operation = command[1];
    var target = command[2];

    switch(operation) {
        case "tr":
        case "transfer":
            if(target != "" || target != undefined || target != null) {
                checkIP(target, async(calla) => {
                    if(calla) {
                        if(target == req.session.ip) {
                            req.session.command_log += "You can't hack yourself!\n";
                            callback();
                        } else {
                            var sql1 = "SELECT uuid, ip_address FROM userdata WHERE ip_address='" + target + "';";
                            var sql2 = "SELECT uuid, ip_address, money FROM bankaccounts WHERE ip_address='" + target + "';";
                            var sql3 = "SELECT uuid, ip_address FROM server WHERE ip_address='" + target + "';";
                            var results1 = await query(sql1);
                            var results2 = await query(sql2);
                            var results3 = await query(sql3);

                            if(results1.length == 1) {
                                var sql11 = "SELECT uuid, money FROM money WHERE uuid='" + results1[0].uuid + "';";
                                var results11 = await query(sql11);
                                var targetMoney1 = Math.floor(results11[0].money * 0.25);
                                await changeMoney(req.session.uuid, targetMoney1, "give");
                                await changeMoney(results1[0].uuid, targetMoney1, "take");

                                //var success = await checkFirewall(req.session.uuid, results1[0].uuid);

                                req.session.command_log += "Transfered $" + targetMoney1 + " from " + target + "!\n";
                                //req.session.command_log += "> " + success + "\n";
                                callback();
                            } else if(results2.length == 1) {
                                req.session.command_log += "You can't hack this target currently!\n";
                                callback();
                            } else if(results3.length == 1) {
                                req.session.command_log += "You can't hack this target currently!\n";
                                callback();
                            } else {
                                req.session.command_log += "Target not found!\n";
                                callback();
                            }
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
            req.session.command_log += "You need to specify a operation [ip]!\n";
            callback();
            break;
    }
}

module.exports = cmdMoney;
