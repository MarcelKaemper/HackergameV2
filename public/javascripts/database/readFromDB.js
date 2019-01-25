var pool = require('./dbconn.js');

function read(sql, callback) {
	// Open connection
	pool.getConnection(function(err,con){
		//Execute given query 
		con.query(sql, function(err, results){
				// Release and continue
				con.release();
				callback(results[0]);
		});
	});
};



module.exports = read;
