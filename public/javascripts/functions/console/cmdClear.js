function cmdClear(req, cmd, command, callback) {
    req.session.command_log = "";
    callback();
}

module.exports = cmdClear;
