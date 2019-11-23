const pool = require('./dbconn.js');

const query = (sql) => {
	// Open connection
	return new Promise((resolve, reject) => {
		pool.getConnection((err,con) => {
			//Execute given query 
			con.query(sql, (err, results) => {
				// Release and continue
				con.release();
				resolve(results);
			});
		});
	});
};

module.exports = query;
