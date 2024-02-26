// routes/admin.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

router.get('/admin', async (req, res) => {
    try {
        let language = req.query.lang; 
        if (!language || (language !== 'en' && language !== 'ru')) {
            language = 'en'; 
        }
        const users = await User.find();
        res.render('admin.ejs', { users: users, language: language, user: req.session.user });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/admin/add', async (req, res) => {
    try {
        const { username, password, phoneNumber ,isAdmin } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const isAdminBool = isAdmin === 'on'
        const newUser = new User({
            username,
            phoneNumber,
            password: hashedPassword,
            isAdmin: isAdminBool,
        });

        await newUser.save();
        res.redirect('/admin');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.put('/admin/edit/:id', async (req, res) => {
    try {
        const { username, password, phoneNumber, isAdmin } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.findByIdAndUpdate(req.params.id, {
            username,
            phoneNumber: phoneNumber,
            password: hashedPassword,
            isAdmin
        });

        res.redirect('/admin');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/admin/delete/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.redirect('/admin');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
