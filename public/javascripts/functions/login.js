var validateEmail = require('./validateEmail.js');
var query = require('../database/dbquery.js');
var writeActivity = require('./writeActivity.js');
var logoutInactive = require('./logoutInactivePlayers.js');
var checkAdmin = require('./checkAdmin.js');
var pwh = require('password-hash');
var setLoggedIn = require('./setLoggedIn.js');

function login(req, arg_login, arg_password) {
    return new Promise(async function(resolve, reject) {
        var login = arg_login;
        var password = arg_password;
        var exists = false;
        var results;
        var sql;
    
        await logoutInactive(true);

        if(validateEmail(login)) {
            sql = "SELECT * FROM logins WHERE mail='"+login+"';";
        } else {
            sql = "SELECT * FROM logins WHERE name='"+login+"';";
        }

        results = await query("SELECT name,mail FROM logins;");

        for(var i in results) {
            if(results[i].name.toLowerCase() == login.toLowerCase() || results[i].mail.toLowerCase() == login.toLowerCase()){
                exists = true;
                break;
            }
        }

        if(exists) {
            results = await query(sql);

            if(pwh.verify(password, results[0].password) && !results[0].loggedIn){
                req.session.userid = results[0].id;
                req.session.name = results[0].name;
                req.session.loggedIn = true;
                req.session.uuid = results[0].uuid;
    
                sql = "SELECT ip_address FROM userdata WHERE uuid='"+req.session.uuid+"';";
                
                results = await query(sql);
                req.session.ip = results[0].ip_address;	
                await writeActivity(req.session.uuid);
                
                req.session.isAdmin = await checkAdmin(req.session.uuid);
                await setLoggedIn(req.session.loggedIn, req.session.uuid);
    
                resolve(true);
            } else {
                resolve(false);
            }
        } else {
            resolve(false);
        }
    });
}

module.exports = login;
