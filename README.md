# HackergameV2
Browsergame made with Node.js and MySQL  
Play an early demo version here: [hackergameV2](https://game.marcelkaemper.de)  
Take a look at the [Wiki](https://github.com/MarcelKaemper/HackergameV2/wiki/tutorial) to get started.  

## Running it locally

```
git clone https://github.com/MarcelKaemper/HackergameV2.git
```

Create the file ```public/javascripts/database/dbconn.js``` and fill in the credentials to your database.  
You can download the structure of our database [here](https://www.marcelkaemper.de/dbstructure.zip) (If outdated -> Open an issue)  

Example dbconn.js
```
var mysql = require('mysql');

var pool = mysql.createPool({
	host: "",
	user: "",
	password: "",
	database: ""
});

module.exports = pool;
```

### Run your server:  

``` 
npm install  
node bin/www  
```
