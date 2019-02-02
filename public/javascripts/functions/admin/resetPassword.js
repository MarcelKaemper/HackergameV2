var query = require('../../database/dbquery.js');
var pwh = require('password-hash');


function resetPassword(uuid, newPW){
    return new Promise(async function(resolve, reject){
        await query("UPDATE logins SET password='"+pwh.generate(newPW)+"' WHERE uuid='"+uuid+"';");
        resolve();
    })

}

module.exports = resetPassword;