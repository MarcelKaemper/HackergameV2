const genUUID = () => {
    return new Promise((resolve, reject) => {
        var charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var uuid = "";
        var min = Math.ceil(0);
        var max = Math.floor(61);
        
        for(var i = 0; i < 16; i++) {
            uuid += charset[(Math.floor(Math.random() * (max - min + 1)) + min)];
        }
        
        resolve(uuid);
    });
}

const genIP = () => {
    return new Promise((resolve, reject) => {
        var ipaddress = "";
        var min = Math.ceil(0);
        var max = Math.floor(255);

        for(var i = 0; i < 4; i++) {
            if(i != 3) {
                ipaddress += "" + (Math.floor(Math.random() * (max - min + 1)) + min) + ".";
            } else {
                ipaddress += "" + (Math.floor(Math.random() * (max - min + 1)) + min);
            }
        }

        resolve(ipaddress);
    });
}

const genPW = () => {
    return new Promise((resolve, reject) => {
        var charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var password = "";
        var min = Math.ceil(0);
        var max = Math.floor(61);
        
        for(var i = 0; i < 8; i++) {
            password += charset[(Math.floor(Math.random() * (max - min + 1)) + min)];
        }
        
        resolve(password);
    });
}

module.exports = {
    genIP,
    genUUID,
    genPW
}
