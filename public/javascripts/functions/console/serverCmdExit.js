const serverCmdExit = (req, cmd, command, callback) => {
    req.session.boolConToSrv = false;
    req.session.conToSrv = "";

    req.session.command_log += "Connection closed!\n";
    callback();
}

module.exports = serverCmdExit;
