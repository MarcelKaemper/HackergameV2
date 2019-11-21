const query = require('../../database/dbquery.js');

loadInbox = (uuid) => {
    return new Promise(async (resolve, reject) => {
        let inbox = (await query("SELECT inbox FROM mails WHERE uuid='"+uuid+"';"))[0].inbox;
        inbox = inbox.replace(/(\r\n|\n|\r)/gm, "\\n");
        inbox = JSON.parse(inbox);
        let previews = {"mails":[]};
        for(let i = inbox.mails.length-1; i>=0; i--){
            previews.mails.push({"index": i, "sender":inbox.mails[i].sender,"subject":inbox.mails[i].subject, "message": inbox.mails[i].message})
        }
        resolve(previews);
    });
}

module.exports = loadInbox;