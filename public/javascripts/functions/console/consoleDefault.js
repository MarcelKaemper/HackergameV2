function consoleDefault(req, cmd, command) {
    return new Promise(function(resolve, reject) {
        req.session.command_log += req.session.displayName + "@" + req.session.ip + "> " + cmd + "\n";
        resolve();
    });
}

module.exports = consoleDefault;
