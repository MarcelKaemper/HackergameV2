const cmdClear = (req, cmd, command) => {
    return new Promise((resolve, reject) => {
        req.session.command_log = "";
        resolve();
    });
}

module.exports = cmdClear;
