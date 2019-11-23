const consoleDefault = (req, cmd, command) => {
    return new Promise((resolve, reject) => {
        req.session.command_log += req.session.displayName + "@" + req.session.ip + "> " + cmd + "\n";
        resolve();
    });
}

module.exports = consoleDefault;
