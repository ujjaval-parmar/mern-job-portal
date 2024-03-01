const authController = require('express').Router();

const User = require('../models/userModel');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');


authController.post('/register', async (req, res) => {

    try {

        console.log(req.body);
        const isExisting = await User.findOne({ email: req.body.email });

        if (isExisting) throw new Error('Email already in use!');

        const hashedPassword = await bcrypt.hash(String(req.body.password), 10);

        const newUser = await User.create({ ...req.body, password: hashedPassword });

        newUser.password = undefined;

        const token = jwt.sign(
            { id: newUser._id },
            process.env.JWT_SECRET,
            { expiresIn: '20h' }
        )

        res.status(201).json({
            status: 'success',
            message: 'User create success',
            data: newUser,
            token,
        })


    } catch (error) {
        res.status(500).json({
            status: 'failed',
            message: 'User Create Failed!',
            error: error.message
        })
    }


})


authController.post('/login', async (req, res) => {

    try {

        const user = await User.findOne({ email: req.body.email });

        if (!user) throw new Error('User does not exist!');

        const comparePassword = await bcrypt.compare(req.body.password, user.password);

        if (!comparePassword) throw new Error('Invalid Paasword!');

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '20h' }
        )

        user.password = undefined;

        res.status(201).json({
            status: 'success',
            message: 'User login success',
            data: user,
            token,
        })



    } catch (error) {
        res.status(500).json({
            status: 'Failed',
            message: 'User Log in Failed!',
            error: error.message
        })
    }


})


module.exports = authController;