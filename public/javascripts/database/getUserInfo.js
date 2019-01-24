var pool = require('./dbconn.js');

function userInfo(id, callback) {
	pool.getConnection(function(err,con){
		sql = "SELECT money FROM money WHERE id='"+id+"'";
		sql2 = "SELECT level, xp FROM levels WHERE id='"+id+"'";
		con.query(sql, function(err, results){
			con.query(sql2, function(err, results2){
				con.release();
				callback({money: results[0].money, level: results2[0].level, xp: results2[0].xp});
			});
		});
	})
};



module.exports = userInfo;
