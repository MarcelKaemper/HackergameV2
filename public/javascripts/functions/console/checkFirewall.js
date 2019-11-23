const query = require('../../database/dbquery.js');
const getLevel = require('../../functions/leveling/getLevel.js');

const checkFirewall = (useruuid, targetuuid) => {
    return new Promise(async(resolve, reject) => {
        var sql = "SELECT * FROM firewall WHERE uuid='" + targetuuid + "';";
        var results = await query(sql);
        
        if(results.length >= 0) {
            var targetLevelFirewall = results[0].levelFirewall;
            var userLevel = await getLevel(useruuid);

            var min = Math.ceil(1);
            var max = Math.floor(100);

            var scope = (targetLevelFirewall - userLevel) / 10;

            if(scope > 0) {
                if(scope <= 90 && scope > 80) {
                    scope = 90;
                } else if(scope <= 80 && scope > 70) {
                    chance4 = 80;
                } else if(scope <= 70 && scope > 60) {
                    scope = 70;
                } else if(scope <= 60 && scope > 50) {
                    scope = 60;
                } else if(scope <= 50 && scope > 40) {
                    scope = 50;
                } else if(scope <= 40 && scope > 30) {
                    scope = 40;
                } else if(scope <= 30 && scope > 20) {
                    scope = 30;
                } else if(scope <= 20 && scope > 10) {
                    scope = 20;
                } else if(scope <= 10 && scope > 0) {
                    scope = 10;
                } else if(scope <= 0) {
                    scope = 0;
                } else if(scope >= 90) {
                    scope = 90;
                } else {}
            } else {
                scope = 90;
            }
            
            var randomfactor = (Math.floor(Math.random() * (max - min + 1)) + min);

            console.log(scope);
            console.log(randomfactor);

            if(randomfactor <= scope && scope >= 0 && scope <= 100) {
                resolve(true);
            } else {
                resolve(false);
            }
        } else {
            resolve(false);
        }
    });
}

module.exports = checkFirewall;
