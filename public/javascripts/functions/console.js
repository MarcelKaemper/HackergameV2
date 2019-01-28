var checkIP = require('./checkIP.js');
var query = require('../database/dbquery.js');
var checkAdmin = require('./checkAdmin.js');

function consolecmd(req, cmd, callback) {
    if(req.session.command_log == null) {
        req.session.command_log = "";
    }
    if(cmd != "") {
        var command = cmd.split(' ');

        switch(command[0]) {
            case "help":
                req.session.command_log += req.session.name + "@" + req.session.ip + "> " + cmd + "\n";
                req.session.command_log += "help ~ Shows this help page\n"
                                        + "clear ~ Clears the commandlog\n";
                callback();
                break;
            case "clear":
                req.session.command_log = "";
                callback();
                break;
            case "money":
                req.session.command_log += req.session.name + "@" + req.session.ip + "> " + cmd + "\n";
                callback();
                break;
            case "check":
                req.session.command_log += req.session.name + "@" + req.session.ip + "> " + cmd + "\n";
                checkAdmin(req.session.uuid, function(callb) {
                    if(callb) {
                        checkIP(command[1], function(call) {
                            if(call) {
                                var sql = "SELECT uuid, ip_address FROM userdata WHERE ip_address='" + command[1] + "';";
                                
                                query(sql, function(results) {
                                    if(results <= 0) {
                                        req.session.command_log += "Target not found!\n";
                                        callback();
                                    } else {
                                        //req.session.command_log += "Target found!\n";
                                        var sql1 = "SELECT name FROM logins WHERE uuid='" + results[0].uuid + "';";
                                        query(sql1, function(results1) {
                                            req.session.command_log += "Name: " + results1[0].name + "\n";
                                            req.session.command_log += "IP: " + results[0].ip_address + "\n";
                                            callback();
                                        });
                                    }
                                });
                            } else {
                                req.session.command_log += "Invalid ip format!\n";
                                callback();
                            }
                        });
                    } else {
                        req.session.command_log += "You are not an admin!\n";
                        callback();
                    }
                });
                // callback();
                break;
            default:
                req.session.command_log += req.session.name + "@" + req.session.ip + "> " + cmd + "\n";
                callback();
                break;
        }
    }
}

module.exports = consolecmd;
