function serverDefault(req, cmd, command) {
    return new Promise(function(resolve, reject) {
        req.session.command_log += "root@" + req.session.conToSrv + "> " + cmd + "\n";
        resolve();
    });
}

module.exports = serverDefault;
