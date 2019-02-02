var query = require('../../database/dbquery.js');

function xpForLvlup(xp, level) {
    return new Promise(function(resolve, reject) {
        resolve(Math.floor((Math.pow(level+1, 2)*125)-xp));
    });
}

module.exports = xpForLvlup;