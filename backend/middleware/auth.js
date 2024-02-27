const authenticateUser = (req, res, next) => {
    if (req.session.user) {
        next(); 
    } else {
        res.redirect('/login');
    }
};

const authenticateAdmin = (req, res, next) => {
    if (req.session.user && req.session.user.isAdmin) {
        next(); 
    } else {
        return res.status(403).render('login.ejs', { error: 'You are not admin, permission denied' });
    }
};

module.exports = {
    authenticateUser,
    authenticateAdmin,
};
