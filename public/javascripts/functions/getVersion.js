const fetch = require('node-fetch');

const getVersion = () => {
    const url = "https://api.github.com/repos/marcelkaemper/HackergameV2/releases";
    return new Promise((resolve, reject) => {
    	fetch(url)
    	.then(res => res.json())
    	.then(data => resolve(data[0]["name"]));
    });
}

module.exports = getVersion;