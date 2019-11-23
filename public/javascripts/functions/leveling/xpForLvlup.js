const xpForLvlup = (xp, level) => {
    return new Promise((resolve, reject) => {
        resolve(Math.floor((Math.pow(level + 1, 2) * 125) - xp));
    });
}

module.exports = xpForLvlup;
