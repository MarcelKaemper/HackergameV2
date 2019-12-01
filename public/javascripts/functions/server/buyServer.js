const query = require('../../database/dbquery.js');
const checkExtend = require('../checkExtend.js');
const generator = require('../generator.js');
const changeMoney = require('../changeMoney.js');
const setXP = require('../leveling/setXP.js');
const getLevel = require('../leveling/getLevel.js');

const buyServer = (req) => {
    return new Promise(async(resolve, reject) => {
        var amount = 50000;
        var uuidOwner = req.session.uuid;
        if(req.session.money >= amount) {
            var srvuuid, srvip;

            let count1, count2 = true;
            var check3, check4;

            while(count1) {
                srvuuid = await generator.genUUID();
                check3 = await checkExtend.UUID(srvuuid);
                if(!check3) {
                    count1 = false;
                    break;
                }
            }
            while(count2) {
                srvip = await generator.genIP();
                check4 = await checkExtend.IP(srvip);
                if(!check4) {
                    count2 = false;
                    break;
                }
            }
            if(!count1 && !count2) {
                var password = await generator.genPW();
                var sql = "INSERT INTO server (uuid, uuidOwner, ip_address, password) VALUES ('" + srvuuid + "', '" + uuidOwner + "', '" + srvip + "', '" + password + "');";
                await query(sql);
                await changeMoney(uuidOwner, amount, "take");
                var reclevel = await getLevel(uuidOwner);
                var newxp = Math.floor(((reclevel / 5) * 10) + 20);
                await setXP(uuidOwner, newxp, "give");
                resolve(true);
            } else {
                resolve(false);
            }
        } else {
            resolve(false);
        }
    });
}

module.exports = buyServer;
