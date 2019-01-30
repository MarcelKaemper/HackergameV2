// >> ######################################## << //
var consoleDefault = require('./console/consoleDefault.js');
// >> ############ Console Commands ########## << //
var cmdHelp = require('./console/cmdHelp.js');
var cmdClear = require('./console/cmdClear.js');
var cmdCheck = require('./console/cmdCheck.js');
var cmdXp = require('./console/cmdXp.js');
var cmdABank = require('./console/cmdABank.js');
// >> ######################################## << //

function consolecmd(req, cmd, callback) {
    if(req.session.command_log == null) {
        req.session.command_log = "";
    }
    if(cmd != "") {
        var command = cmd.split(' ');

        switch(command[0]) {
            case "help":
                consoleDefault(req, cmd, command, function() {
                    cmdHelp(req, cmd, command, function() {
                        callback();
                    });
                });
                break;
            case "clear":
                consoleDefault(req, cmd, command, function() {
                    cmdClear(req, cmd, command, function() {
                        callback();
                    });
                });
                break;
            case "check":
                consoleDefault(req, cmd, command, function() {
                    cmdCheck(req, cmd, command, function() {
                        callback();
                    });
                });
                break;
            case "xp":
                consoleDefault(req, cmd, command, function() {
                    cmdXp(req, cmd, command, function() {
                        callback();
                    });
                });
                break;
            case "bank":
                consoleDefault(req, cmd, command, function() {
                    cmdABank(req, cmd, command, function() {
                        callback();
                    });
                });
                break;
            default:
                consoleDefault(req, cmd, command, function() {
                    callback();
                });
                break;
        }
    }
}

module.exports = consolecmd;
