const loadSrvInventory = require('./loadSrvInventory.js');

const checkSrvItem = (srvuuid, itemuuid) => {
    return new Promise(async(resolve, reject) => {
        var srvinv = await loadSrvInventory(srvuuid);
        var length = srvinv.inventory.length;
        var counter = 0;
        
        if(length > 0) {
            while(counter <= length) {
                if(counter == length) {
                    resolve(false);
                } else {
                    if(srvinv.inventory[counter].uuid == itemuuid) {
                        resolve(true);
                        break;
                    }
                }
                counter++;
            }
        } else {
            resolve(false);
        }
    });
}

module.exports = checkSrvItem;
