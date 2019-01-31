var pool = require('./dbconn.js');

function query(sql) {
	// Open connection
	return new Promise(function(resolve, reject) {
		pool.getConnection(function(err,con){
			//Execute given query 
			con.query(sql, function(err, results) {
				// Release and continue
				con.release();
				resolve(results);
			});
		});
	});
};


module.exports = query;
