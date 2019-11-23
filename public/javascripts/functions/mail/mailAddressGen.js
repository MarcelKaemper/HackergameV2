let generateMailAddress = (name) => {
    return new Promise((resolve, reject) => {
        resolve(name + "@hackergame.com");
    });
}

module.exports = generateMailAddress;
