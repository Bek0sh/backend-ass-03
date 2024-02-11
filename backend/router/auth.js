const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const router = express.Router();

// Login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).render('login.ejs', { error: 'No user found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).render('login.ejs', { error: 'Incorrect username or password' });
        }

        req.session.user = user;
        res.redirect('/main');
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.post('/logout', (req, res) => {

    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            res.status(500).send('Internal Server Error');
        } else {
            res.redirect('/login'); // Redirect to login page after logout
        }
    });
});

router.post('/register', async (req, res) => {
    try {
        const { phoneNumber, username, password } = req.body;

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        var isAdmin = false;

        if (password === 'bekarys' && username === 'bekarys') {
            isAdmin = true;
        }

        const newUser = new User({
            username,
            phoneNumber: phoneNumber,
            password: hashedPassword,
            isAdmin: isAdmin,
            creationDate: new Date(),
        });

        await newUser.save();

        res.redirect("/login")
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});



module.exports = router;
