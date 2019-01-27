function consolecmd(req, cmd, callback) {
    if(req.session.command_log == null) {
        req.session.command_log = "";
    }
    if(cmd != "") {
        var command = cmd.split(' ');

        switch(command[0]) {
            case "help":
                req.session.command_log += req.session.name + "@" + req.session.ip + "> " + cmd + "\n";
                req.session.command_log += "help ~ Shows this help page\n"
                                        + "clear ~ Clears the commandlog\n";
                callback();
                break;
            case "clear":
                req.session.command_log = "";
                callback();
                break;
            case "money":
                req.session.command_log += req.session.name + "@" + req.session.ip + "> " + cmd + "\n";
                callback();
                break;
            default:
                req.session.command_log += req.session.name + "@" + req.session.ip + "> " + cmd + "\n";
                callback();
                break;
        }
    }
}

module.exports = consolecmd;
