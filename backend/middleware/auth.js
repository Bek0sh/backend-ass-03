// middleware/auth.js
const authenticateUser = (req, res, next) => {
    if (req.session.user) {
        next(); // User is authenticated, proceed to the next middleware
    } else {
        res.redirect('/login'); // User is not logged in, redirect to the login page
    }
};

const authenticateAdmin = (req, res, next) => {
    if (req.session.user && req.session.user.isAdmin) {
        next(); // User is authenticated, proceed to the next middleware
    } else {
        return res.status(403).render('login.ejs', { error: 'You are not admin, permission denied' });
    }
};

module.exports = {
    authenticateUser,
    authenticateAdmin,
};
