var pool = require('./dbconn.js');

function insert(sql, callback){
	pool.getConnection(function(err,con){
		con.query(sql, function(err, results){
			con.release();
			callback(results);
		});
	});
}

module.exports = insert;
