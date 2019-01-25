var pool = require('./dbconn.js');

function query(sql, callback) {
	// Open connection
	pool.getConnection(function(err,con){
		//Execute given query 
		con.query(sql, function(err, results){
				// Release and continue
				con.release();
				callback(results);
		});
	});
};



module.exports = query;
