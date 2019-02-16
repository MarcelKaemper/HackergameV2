const getUserInfo = (req) => {
    return new Promise((resolve, reject) => {
        resolve({name: req.session.name,
                    displayName: req.session.displayName,
                    xp: req.session.xp, 
                    neededXP: req.session.neededXP, 
                    clan: req.session.clan!=""?req.session.clan:"None",
                    level: req.session.level,
                    money: req.session.money, 
                    ip: req.session.ip});
    });
};

module.exports = getUserInfo;
