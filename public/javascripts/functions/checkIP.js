const net = require('net');

const checkIP = (ipaddress) => {
    return new Promise((resolve, reject) => {
        if(net.isIPv4(ipaddress)) {
            resolve(true);
        } else {
            resolve(false);
        }
    });
}

module.exports = checkIP;
