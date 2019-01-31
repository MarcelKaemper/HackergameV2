// >> ######################################## << //
var consoleDefault = require('./console/consoleDefault.js');
// >> ############ Console Commands ########## << //
var cmdHelp = require('./console/cmdHelp.js');
var cmdClear = require('./console/cmdClear.js');
var cmdCheck = require('./console/cmdCheck.js');
var cmdXp = require('./console/cmdXp.js');
var cmdABank = require('./console/cmdABank.js');
// >> ######################################## << //

function consolecmd(req, cmd) {
    return new Promise(async function(resolve, reject) {
        if(req.session.command_log == null) {
            req.session.command_log = "";
        }
        if(cmd != "") {
            var command = cmd.split(' ');

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
                default:
                    await consoleDefault(req, cmd, command);
                    resolve();
                    break;
            }
        }
    });
}

module.exports = consolecmd;
