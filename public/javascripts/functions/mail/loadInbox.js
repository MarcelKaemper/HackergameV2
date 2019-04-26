var query = require('../../database/dbquery.js');

loadInbox = (uuid) => {
    return new Promise(async (resolve, reject) => {
        let inbox = (await query("SELECT inbox FROM mails WHERE uuid='"+uuid+"';"))[0].inbox;
        inbox = inbox.replace(/(\r\n|\n|\r)/gm, "\\n");
        inbox = JSON.parse(inbox).mails;
        let previews = []
        for(let i = inbox.length-1; i>=0; i--){
            previews.push({"sender":inbox[i].sender,"subject":inbox[i].subject, "message": inbox[i].message})
        }
        resolve(previews);
    });
}

module.exports = loadInbox;