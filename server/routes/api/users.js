const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const { authorize } = require('../../middleware/authorize');



//@route    POST api/users/
//@desc     register user
//@access   public
router.post('/', [auth, authorize('admin'),
    // check('name', 'Name is required').not().isEmpty(),
    check('firstName', 'First name is required').not().isEmpty(),
    check('lastName', 'Last name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({
        min: 6
    })], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(404).json({ errors: errors.array() });
        }

        const { name, firstName, lastName, email, password } = req.body

        try {
            //check if the user exists
            let user = await User.findOne({ email: email });

            if (user) {
                return res.status(400).json({
                    errors: [{
                        msg: 'User already exsists'
                    }]
                })
            }

            user = new User({ name, firstName, lastName, email, password });

            //Encryt password
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            await user.save();

            res.status(200).send('user saved')


            // const payload = {
            //     user: {
            //         id: user.id
            //     }
            // }
            // jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 36000 }, (err, token) => {
            //     if (err) throw err;
            //     return res.json({ token });
            // });

        } catch (error) {
            res.status(500).send('Server error')
        }
    });

//@route    POST api/users/
//@desc     register user
//@access   public
router.post('/register', [
    // check('name', 'Name is required').not().isEmpty(),
    check('firstName', 'First name is required').not().isEmpty(),
    check('lastName', 'Last name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({
        min: 6
    })], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(404).json({ errors: errors.array() });
        }

        const { name, firstName, lastName, email, password } = req.body

        try {
            //check if the user exists
            let user = await User.findOne({ email: email });

            if (user) {
                return res.status(400).json({
                    errors: [{
                        msg: 'User already exsists'
                    }]
                })
            }

            user = new User({ name, firstName, lastName, email, password });

            //Encryt password
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            await user.save();

            res.status(200).send('user saved')


            // const payload = {
            //     user: {
            //         id: user.id
            //     }
            // }
            // jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 36000 }, (err, token) => {
            //     if (err) throw err;
            //     return res.json({ token });
            // });

        } catch (error) {
            res.status(500).send('Server error')
        }
    });

module.exports = router;