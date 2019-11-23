const cmdHelp = (req, cmd, command, callback) => {
    req.session.command_log += "help ~ Shows this help page\n"
                            + "clear ~ Clears the commandlog\n"
                            + "scan [ip, (network)] <target> ~ Scan a target\n"
                            + "money [tr, transfer] <target> ~ Steal money from a target\n"
                            + "server [connect] <target> <password> ~ Connect to a server\n"
                            + "#> Server Commands:\n"
                            + "ls ~ Shows installed software\n"
                            + "exit ~ Leaves the server\n"
                            + "execute [software|show] <software> ~ Executes software on server\n";
    callback();
}

module.exports = cmdHelp;
