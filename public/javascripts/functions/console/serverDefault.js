const serverDefault = (req, cmd, command) => {
    return new Promise((resolve, reject) => {
        req.session.command_log += "root@" + req.session.conToSrv + "> " + cmd + "\n";
        resolve();
    });
}

module.exports = serverDefault;
