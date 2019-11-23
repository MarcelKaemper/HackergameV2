const net = require('net');

const checkIP = (ipaddress, callback) => {
    if(net.isIPv4(ipaddress)) {
        callback(true);
    } else {
        callback(false);
    }
}

module.exports = checkIP;
