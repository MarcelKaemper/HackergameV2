function consoleDefault(req, cmd, command, callback) {
    req.session.command_log += req.session.name + "@" + req.session.ip + "> " + cmd + "\n";
    callback();
}

module.exports = consoleDefault;
