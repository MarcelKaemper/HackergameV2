var pool = require('./dbconn.js');

function userInfo(id, callback) {
	pool.getConnection(function(err,con){
		con.query("SELECT money FROM money WHERE id='"+id+"'", function(err, results){
			con.release();
			callback(results[0].money);
		});
	})
};



module.exports = userInfo;
