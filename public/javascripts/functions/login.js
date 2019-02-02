var validateEmail = require('./validateEmail.js');
var query = require('../database/dbquery.js');
var writeActivity = require('./writeActivity.js');
var logoutInactive = require('./logoutInactivePlayers.js');
var checkAdmin = require('./checkAdmin.js');
var pwh = require('password-hash');
var setLoggedIn = require('./setLoggedIn.js');

function login(req, arg_login, arg_password) {
    return new Promise(async function(resolve, reject) {
        var login = arg_login.toLowerCase();
        var password = arg_password;
        var sql;
    
        await logoutInactive(true);

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

                var sql2 = "SELECT ip_address FROM userdata WHERE uuid='" + req.session.uuid + "';";
                
                var results2 = await query(sql2);
                req.session.ip = results2[0].ip_address;	
                await writeActivity(req.session.uuid);
                
                req.session.isAdmin = await checkAdmin(req.session.uuid);
                await setLoggedIn(req.session.loggedIn, req.session.uuid);
    
                resolve(true);
            } else {
                resolve(false);
            }
        }
    });
}

module.exports = login;
