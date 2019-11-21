const query = require('../../database/dbquery.js');

delMail = (inbox, index, uuid) => {
    return new Promise(async (resolve, reject) => {
        // Delete selected email
        for (let i = 0; i < inbox.mails.length; i++) {
            if (inbox.mails[i].index == index) {
                inbox.mails.splice(i, 1);
            }
        }
        // Delete indexes
        for (let i = 0; i < inbox.mails.length; i++) {
            delete inbox.mails[i].index;
        }
        // Insert empty JSON object if no mail exists
        if (inbox.mails.length > 0) {
            inbox = JSON.stringify(inbox);
        } else {
            inbox = '{"mails":[]}';
        }

        // Update Inbox in DB
        await query("UPDATE mails SET inbox='" + inbox + "' WHERE uuid='" + uuid + "';");
        resolve();
    });
}

module.exports = delMail;