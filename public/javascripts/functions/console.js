// >> ######################################## << //
const consoleDefault = require('./console/consoleDefault.js');
const serverDefault = require('./console/serverDefault.js');
// >> ############ Console Commands ########## << //
const cmdHelp = require('./console/cmdHelp.js');
const cmdClear = require('./console/cmdClear.js');
const cmdCheck = require('./console/cmdCheck.js');
const cmdXp = require('./console/cmdXp.js');
const cmdABank = require('./console/cmdABank.js');
const cmdScan = require('./console/cmdScan.js');
const cmdMoney = require('./console/cmdMoney.js');
const cmdServer = require('./console/cmdServer.js');
// >> ######################################## << //
// >> ############ Server Commands ########## << //
const serverCmdExit = require('./console/serverCmdExit.js');
const serverCmdLs = require('./console/serverCmdLs.js');
const serverCmdExecute = require('./console/serverCmdExecute.js');
// >> ######################################## << //

const consolecmd = (req, cmd) => {
    return new Promise(async(resolve, reject) => {
        if(req.session.command_log == null) {
            req.session.command_log = "";
        }
        if(cmd != "") {
            var command = cmd.split(' ');

            if(!req.session.boolConToSrv) {
                switch(command[0]) {
                    case "help":
                        await consoleDefault(req, cmd, command);
                        cmdHelp(req, cmd, command, () => {
                            resolve();
                        });
                        break;
                    case "clear":
                        await consoleDefault(req, cmd, command);
                        cmdClear(req, cmd, command, () => {
                            resolve();
                        });
                        break;
                    case "check":
                        await consoleDefault(req, cmd, command);
                        cmdCheck(req, cmd, command, () => {
                            resolve();
                        });
                        break;
                    case "xp":
                        await consoleDefault(req, cmd, command);
                        cmdXp(req, cmd, command, () => {
                            resolve();
                        });
                        break;
                    case "bank":
                        await consoleDefault(req, cmd, command);
                        cmdABank(req, cmd, command, () => {
                            resolve();
                        });
                        break;
                    case "scan":
                        await consoleDefault(req, cmd, command);
                        cmdScan(req, cmd, command, () => {
                            resolve();
                        });
                        break;
                    case "money":
                        await consoleDefault(req, cmd, command);
                        cmdMoney(req, cmd, command, () => {
                            resolve();
                        });
                        break;
                    case "server":
                        await consoleDefault(req, cmd, command);
                        cmdServer(req, cmd, command, () => {
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
                        serverCmdExit(req, cmd, command, () => {
                            resolve();
                        });
                        break;
                    case "clear":
                        await serverDefault(req, cmd, command);
                        cmdClear(req, cmd, command, () => {
                            resolve();
                        });
                        break;
                    case "help":
                        await serverDefault(req, cmd, command);
                        cmdHelp(req, cmd, command, () => {
                            resolve();
                        });
                        break;
                    case "ls":
                        await serverDefault(req, cmd, command);
                        serverCmdLs(req, cmd, command, () => {
                            resolve();
                        });
                        break;
                    case "execute":
                        await serverDefault(req, cmd, command);
                        serverCmdExecute(req, cmd, command, () => {
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
