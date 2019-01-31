function consoleDefault(req, cmd, command) {
    return new Promise(function(resolve, reject) {
        req.session.command_log += req.session.name + "@" + req.session.ip + "> " + cmd + "\n";
        resolve();
    });
}

module.exports = consoleDefault;
