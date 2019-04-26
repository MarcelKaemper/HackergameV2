var query = require('../../database/dbquery.js');

mailPreview = (uuid) => {
    return new Promise(async (resolve, reject) => {
        let inbox = (await query("SELECT inbox FROM mails WHERE uuid='"+uuid+"';"))[0].inbox;
        inbox = inbox.replace(/(\r\n|\n|\r)/gm, "\\n");
        inbox = JSON.parse(inbox).mails;
        let previews = []
        for(let x of inbox){
            previews.push({"sender":x.sender,"subject":x.subject})
        }
        resolve(previews);
    });
}

module.exports = mailPreview;

// return [[subject1,subject2,subject3],[sender1,sender2,sender3]]