var query = require('../../database/dbquery.js');
var checkAdmin = require('../checkAdmin.js');
var checkExtend = require('../checkExtend.js');
var generator = require('../generator.js');

function cmdABank(req, cmd, command, callback) {
    checkAdmin(req.session.uuid, function(calla) {
        if(calla) {
            var operation = command[1];
            var targetName = command[2];
            if(targetName == "" || targetName == undefined || targetName == null) {
                req.session.command_log += "You need to specify a name!\n";
                callback();
            } else {
                switch(operation) {
                    case "create":
                        var sql1 = "SELECT name FROM bankAccounts WHERE name='" + targetName + "';";
                        query(sql1, function(result1) {
                            if(result1 <= 0) {
                                generator.genUUID(function (recuuid) {
                                    generator.genIP(function(recipaddress) {
                                        var sql2 = "INSERT INTO bankAccounts (uuid, name, money, ip_address) VALUES ('" + recuuid + "', '" + targetName + "', 0, '" + recipaddress + "');";
    
                                        query(sql2, function(result2) {
                                            req.session.command_log += "Bank account successful created!\n";
                                            callback();
                                        });
                                    });
                                });
                            } else {
                                req.session.command_log += "Name is not available!\n";
                                callback();
                            }
                        });
                        break;
                    default:
                        req.session.command_log += "You need to specify a operation [create]!\n";
                        callback();
                        break;
                }
            }
        } else {
            req.session.command_log += "You are not an admin!\n";
            callback();
        }
    });
}

module.exports = cmdABank;
