const validateEmail = require('./validateEmail.js');
const query = require('../database/dbquery.js');
const writeActivity = require('./writeActivity.js');
const checkAdmin = require('./checkAdmin.js');
const pwh = require('password-hash');
const setLoggedIn = require('./setLoggedIn.js');
const writeRealIP = require('./writeRealIP.js');
const consolecmd = require('./console/consolecmd.js');

const login = (req, arg_login, arg_password) => {
    return new Promise(async(resolve, reject) => {
        var login = arg_login.toLowerCase();
        var password = arg_password;
        var sql;
    
        if(validateEmail(login)) {
            sql = "SELECT * FROM logins WHERE mail='" + login +"';";
        } else {
            sql = "SELECT * FROM logins WHERE name='" + login + "';";
        }

        var results = await query(sql);

        if(results <= 0) {
            resolve(false);
        } else {
            if(pwh.verify(password, results[0].password) && !results[0].loggedIn) {
                req.session.userid = results[0].id;
                req.session.name = results[0].name;
                req.session.loggedIn = true;
                req.session.uuid = results[0].uuid;
                req.session.displayName = results[0].displayName;

                var realip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
                req.session.realip = realip;
                
                req.session.boolConToSrv = false;
                req.session.conToSrv = "";

                var sql2 = "SELECT ip_address, mail_address FROM userdata WHERE uuid='" + req.session.uuid + "';";
                
                var results2 = await query(sql2);
                req.session.ip = results2[0].ip_address;	
                req.session.mail = results2[0].mail_address;

                req.session.isAdmin = await checkAdmin(req.session.uuid);
                await writeActivity(req.session.uuid);
                await setLoggedIn(req.session.loggedIn, req.session.uuid);
                await writeRealIP(req, req.session.uuid, req.session.realip);

                await consolecmd(req, "help");
    
                resolve(true);
            } else {
                resolve(false);
            }
        }
    });
}

module.exports = login;
