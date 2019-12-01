const serverCmdExit = (req, cmd, command) => {
    return new Promise((resolve, reject) => {
        req.session.boolConToSrv = false;
        req.session.conToSrv = "";

        req.session.command_log += "Connection closed!\n";
        resolve();
    });
}

module.exports = serverCmdExit;
