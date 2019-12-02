// >> ######################################## << //
const consoleDefault = require('./consoleDefault.js');
const serverDefault = require('./serverDefault.js');
// >> ############ Console Commands ########## << //
const cmdHelp = require('./cmdHelp.js');
const cmdClear = require('./cmdClear.js');
const cmdCheck = require('./cmdCheck.js');
const cmdXp = require('./cmdXp.js');
const cmdABank = require('./cmdABank.js');
const cmdScan = require('./cmdScan.js');
const cmdMoney = require('./cmdMoney.js');
const cmdServer = require('./cmdServer.js');
// >> ######################################## << //
// >> ############ Server Commands ########## << //
const serverCmdExit = require('./serverCmdExit.js');
const serverCmdLs = require('./serverCmdLs.js');
const serverCmdExecute = require('./serverCmdExecute.js');
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
                        await cmdHelp(req, cmd, command);
                        resolve();
                        break;
                    case "clear":
                        await consoleDefault(req, cmd, command);
                        await cmdClear(req, cmd, command);
                        resolve();
                        break;
                    case "check":
                        await consoleDefault(req, cmd, command);
                        await cmdCheck(req, cmd, command);
                        resolve();
                        break;
                    case "xp":
                        await consoleDefault(req, cmd, command);
                        await cmdXp(req, cmd, command);
                        resolve();
                        break;
                    case "bank":
                        await consoleDefault(req, cmd, command);
                        await cmdABank(req, cmd, command);
                        resolve();
                        break;
                    case "scan":
                        await consoleDefault(req, cmd, command);
                        await cmdScan(req, cmd, command);
                        resolve();
                        break;
                    case "money":
                        await consoleDefault(req, cmd, command);
                        await cmdMoney(req, cmd, command);
                        resolve();
                        break;
                    case "server":
                        await consoleDefault(req, cmd, command);
                        await cmdServer(req, cmd, command);
                        resolve();
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
                        await serverCmdExit(req, cmd, command);
                        resolve();
                        break;
                    case "clear":
                        await serverDefault(req, cmd, command);
                        await cmdClear(req, cmd, command);
                        resolve();
                        break;
                    case "help":
                        await serverDefault(req, cmd, command);
                        await cmdHelp(req, cmd, command);
                        resolve();
                        break;
                    case "ls":
                        await serverDefault(req, cmd, command);
                        await serverCmdLs(req, cmd, command);
                        resolve();
                        break;
                    case "execute":
                        await serverDefault(req, cmd, command);
                        await serverCmdExecute(req, cmd, command);
                        resolve();
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
