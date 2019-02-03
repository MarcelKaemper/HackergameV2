const getUserInfo = (req) => {
    return new Promise((resolve, reject) => {
        resolve({name: req.session.name,
                    displayName: req.session.displayName,
                    xp: req.session.xp, 
                    neededXP: req.session.neededXP, 
                    level: req.session.level,
                    money: req.session.money, 
                    ip: req.session.ip});
    });
};

module.exports = getUserInfo;
