const stdParameter = (req, title, obj) => {
    return Object.assign(obj,{loggedIn: req.session.loggedIn,
            isAdmin: req.session.isAdmin,
            title: title});
}

module.exports = stdParameter;
