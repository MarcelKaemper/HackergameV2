// >> ######################################## << //
var consoleDefault = require('./console/consoleDefault.js');
var serverDefault = require('./console/serverDefault.js');
// >> ############ Console Commands ########## << //
var cmdHelp = require('./console/cmdHelp.js');
var cmdClear = require('./console/cmdClear.js');
var cmdCheck = require('./console/cmdCheck.js');
var cmdXp = require('./console/cmdXp.js');
var cmdABank = require('./console/cmdABank.js');
var cmdScan = require('./console/cmdScan.js');
var cmdMoney = require('./console/cmdMoney.js');
var cmdServer = require('./console/cmdServer.js');
// >> ######################################## << //
// >> ############ Server Commands ########## << //
var serverCmdExit = require('./console/serverCmdExit.js');
var serverCmdLs = require('./console/serverCmdLs.js');
var serverCmdExecute = require('./console/serverCmdExecute.js');
// >> ######################################## << //

function consolecmd(req, cmd) {
    return new Promise(async function(resolve, reject) {
        if(req.session.command_log == null) {
            req.session.command_log = "";
        }
        if(cmd != "") {
            var command = cmd.split(' ');

            if(!req.session.boolConToSrv) {
                switch(command[0]) {
                    case "help":
                        await consoleDefault(req, cmd, command);
                        cmdHelp(req, cmd, command, function() {
                            resolve();
                        });
                        break;
                    case "clear":
                        await consoleDefault(req, cmd, command);
                        cmdClear(req, cmd, command, function() {
                            resolve();
                        });
                        break;
                    case "check":
                        await consoleDefault(req, cmd, command);
                        cmdCheck(req, cmd, command, function() {
                            resolve();
                        });
                        break;
                    case "xp":
                        await consoleDefault(req, cmd, command);
                        cmdXp(req, cmd, command, function() {
                            resolve();
                        });
                        break;
                    case "bank":
                        await consoleDefault(req, cmd, command);
                        cmdABank(req, cmd, command, function() {
                            resolve();
                        });
                        break;
                    case "scan":
                        await consoleDefault(req, cmd, command);
                        cmdScan(req, cmd, command, function() {
                            resolve();
                        });
                        break;
                    case "money":
                        await consoleDefault(req, cmd, command);
                        cmdMoney(req, cmd, command, function() {
                            resolve();
                        });
                        break;
                    case "server":
                        await consoleDefault(req, cmd, command);
                        cmdServer(req, cmd, command, function() {
                            resolve();
                        });
                        break;
                    default:
                        await consoleDefault(req, cmd, command);
                        resolve();
                        break;
                }
            } else {
                switch(command[0]) {
                    case "exit":
                        await serverDefault(req, cmd, command);
                        serverCmdExit(req, cmd, command, function() {
                            resolve();
                        });
                        break;
                    case "clear":
                        await serverDefault(req, cmd, command);
                        cmdClear(req, cmd, command, function() {
                            resolve();
                        });
                        break;
                    case "help":
                        await serverDefault(req, cmd, command);
                        cmdHelp(req, cmd, command, function() {
                            resolve();
                        });
                        break;
                    case "ls":
                        await serverDefault(req, cmd, command);
                        serverCmdLs(req, cmd, command, function() {
                            resolve();
                        });
                        break;
                    case "execute":
                        await serverDefault(req, cmd, command);
                        serverCmdExecute(req, cmd, command, function() {
                            resolve();
                        });
                        break;
                    default:
                        await serverDefault(req, cmd, command);
                        resolve();
                        break;
                }
            }
        }
    });
}

module.exports = consolecmd;
