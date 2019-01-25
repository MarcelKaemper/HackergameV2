var pool = require('./dbconn.js');

function read(sql, callback) {
	pool.getConnection(function(err,con){
		con.query(sql, function(err, results){
				con.release();
				callback(results[0]);
		});
	});
};



module.exports = read;
