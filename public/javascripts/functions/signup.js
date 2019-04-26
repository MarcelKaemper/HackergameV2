var checkExtend = require('./checkExtend.js');
var query = require('../database/dbquery.js');
var pwh = require('password-hash');
var generator = require('./generator.js');
var mailAddressGen = require('./mail/mailAddressGen.js');

function signup(req, arg_mail, arg_name, arg_password, arg_confirm_password) {
    return new Promise(async function(resolve, reject) {
        var mail = arg_mail.toLowerCase();
        var name = arg_name;
        var password = arg_password;
        var confirm_password = arg_confirm_password;
        var mailAddress = await mailAddressGen(name);
        var realip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        var check1 = await checkExtend.Name(name);
        var check2 = await checkExtend.Mail(mail);

        if(!check1 && !check2) {
            if(password == confirm_password) {
                password = pwh.generate(password);
                var uuid;
                var ip_address;
                
                let count1 = true;
                let count2 = true;
                var check3;
                var check4;

                while(count1) {
                    uuid = await generator.genUUID();
                    check3 = await checkExtend.UUID(uuid);
                    if(!check3) {
                        count1 = false;
                        break;
                    }
                }
                while(count2) {
                    ip_address = await generator.genIP();
                    check4 = await checkExtend.IP(ip_address);
                    if(!check4) {
                        count2 = false;
                        break;
                    }
                }
                if(!count1 && !count2) {
                    var sql1 = "INSERT INTO logins(uuid, mail, name, displayName, password, updated_realip, registered_realip) VALUES ('" + uuid + "', '" + mail.toLowerCase() + "', '" + name.toLowerCase() + "', '" + name + "', '" + password + "', '" + realip + "', '" + realip + "');";
                    var sql2 = "INSERT INTO money(uuid, money) VALUES ('" + uuid + "', '10000');";
                    var sql3 = "INSERT INTO levels(uuid, level, xp) VALUES ('" + uuid + "', '0', '0');";
                    var sql4 = "INSERT INTO userdata(uuid, ip_address, mail_address) VALUES ('" + uuid +"', '" + ip_address + "', '" + mailAddress + "');";
                    var sql5 = "INSERT INTO lastactivity(uuid) VALUES ('" + uuid + "');";
                    var sql6 = "INSERT INTO cashbonus(uuid) VALUES ('" + uuid + "');";
                    var sql7 = "INSERT INTO stocks(uuid) VALUES ('" + uuid +"');";
                    var sql8 = "INSERT INTO inventory(uuid) VALUES ('" + uuid + "');";

                    await query(sql1);
                    await query(sql2);
                    await query(sql3);
                    await query(sql4);
                    await query(sql5);
                    await query(sql6);
                    await query(sql7);
                    await query(sql8);

                    resolve(true);
                } else {
                    resolve(false);
                }
            } else {
                resolve(false);
            }
        } else {
            resolve(false);
        }
    });
}

module.exports = signup;
