var query = require('../../database/dbquery.js');

sendMail = (req, sendTo, subject, message) => {
    return new Promise(async (resolve, reject) => {
        // Get UUID of receiver
        let results = await query("SELECT uuid FROM userdata WHERE mail_address='" + sendTo + "';");
        let sendToUuid = results[0].uuid;

        // Get inbox of receiver
        results = await query("SELECT inbox FROM mails WHERE uuid='" + sendToUuid + "';");
        let inbox = results[0].inbox.replace(/(\r\n|\n|\r)/gm, "\\n");
        inbox = JSON.parse(inbox);

        // Add mail to inbox of receiver
        inbox.mails.push(JSON.parse('{"sender":"' + req.session.mail + '", "subject":"' + subject + '", "message":"' + message + '"}'));
        inbox = JSON.stringify(inbox);
        await query("UPDATE mails SET inbox='" + inbox + "' WHERE uuid='" + sendToUuid + "';");
        resolve();
    });
}

module.exports = sendMail;

// inbox = sendTo(mail) -> uuid -> mails(jsonObject)
// inbox add -> object(this.email,subject,message)