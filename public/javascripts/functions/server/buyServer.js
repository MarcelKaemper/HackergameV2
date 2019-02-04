var query = require('../../database/dbquery.js');
var checkExtend = require('../checkExtend.js');
var generator = require('../generator.js');
var changeMoney = require('../changeMoney.js');
var setXP = require('../leveling/setXP.js');
var getLevel = require('../leveling/getLevel.js');

function buyServer(req) {
    return new Promise(async function(resolve, reject) {
        var amount = 50000;
        var uuidOwner = req.session.uuid;
        if(req.session.money >= amount) {
            var srvuuid;
            var srvip;

            let count1 = true;
            let count2 = true;
            var check3;
            var check4;

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
                var sql = "INSERT INTO server (uuid, uuidOwner, ip_address) VALUES ('" + srvuuid + "', '" + uuidOwner + "', '" + srvip + "');";
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
