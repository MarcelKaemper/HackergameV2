const query = require('../../database/dbquery.js');
const pwh = require('password-hash');

const resetPassword = (uuid, newPW) => {
    return new Promise(async(resolve, reject) => {
        await query("UPDATE logins SET password='"+pwh.generate(newPW)+"' WHERE uuid='"+uuid+"';");
        resolve();
    })

}

module.exports = resetPassword;
