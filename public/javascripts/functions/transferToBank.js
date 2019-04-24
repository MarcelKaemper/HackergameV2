var query = require('../database/dbquery.js');

function transferToBank(amount, operation) {
    return new Promise(async function(resolve, reject) {
        var bankuuid = "ygEmyYBxlYDCGfJQ";

        if(operation == "give") {
			sql = "UPDATE bankaccounts SET money=money+"+amount+" WHERE uuid='"+bankuuid+"';";
			await query(sql);
			resolve();
		} else if(operation == "take") {
			let currentMoney = await query("SELECT money FROM bankaccounts WHERE uuid='"+bankuuid+"';");
			if(currentMoney[0].money>=amount) {
				sql = "UPDATE bankaccounts SET money=money-"+amount+" WHERE uuid='"+bankuuid+"';";
				await query(sql);
				//successful
				resolve(true);
			} else {
				// Not successful
				resolve(false);
			}
		 } else if(operation == "set") {
			sql = "UPDATE bankaccounts SET money="+amount+" WHERE uuid='"+bankuuid+"';";
			await query(sql);
			resolve();
		} else {
			reject();
		}

    });
}

module.exports = transferToBank;
