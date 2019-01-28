function cmdHelp(req, cmd, command, callback) {
    req.session.command_log += "help ~ Shows this help page\n"
                            + "clear ~ Clears the commandlog\n";
    callback();
}

module.exports = cmdHelp;
