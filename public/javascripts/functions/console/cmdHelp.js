function cmdHelp(req, cmd, command, callback) {
    req.session.command_log += "help ~ Shows this help page\n"
                            + "clear ~ Clears the commandlog\n"
                            + "scan [ip, (network)] <target> ~ Scan a target\n"
                            + "money [tr, transfer] <target> ~ Steal money from a target\n"
                            + "server [connect] <target> <password> ~ Connect to a server\n";
    callback();
}

module.exports = cmdHelp;
