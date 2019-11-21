const net = require('net');

function checkIP(ipaddress, callback) {
    if(net.isIPv4(ipaddress)) {
        callback(true);
    } else {
        callback(false);
    }
}

module.exports = checkIP;
