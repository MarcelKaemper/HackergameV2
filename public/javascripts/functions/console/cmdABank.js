const query = require('../../database/dbquery.js');
const checkAdmin = require('../checkAdmin.js');
const generator = require('../generator.js');

async function cmdABank(req, cmd, command, callback) {
    var calla = await checkAdmin(req.session.uuid);
    if(calla) {
        var operation = command[1];
        var targetName = command[2];
        if(targetName == "" || targetName == undefined || targetName == null) {
            req.session.command_log += "You need to specify a name!\n";
            callback();
        } else {
            switch(operation) {
                case "create":
                    var sql1 = "SELECT name FROM bankaccounts WHERE name='" + targetName + "';";
                    var results1 = await query(sql1);
                    if(results1 <= 0) {
                        var recuuid = await generator.genUUID();
                        var recipaddress = await generator.genIP();
                        var sql2 = "INSERT INTO bankaccounts (uuid, name, money, ip_address) VALUES ('" + recuuid + "', '" + targetName + "', 0, '" + recipaddress + "');";
      
                        await query(sql2);
                        req.session.command_log += "Bank account successful created!\n";
                        callback();
                    } else {
                        req.session.command_log += "Name is not available!\n";
                        callback();
                    }
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
}

module.exports = cmdABank;
