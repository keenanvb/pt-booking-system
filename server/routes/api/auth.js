const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
let User = require('../../models/User');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const crypto = require('crypto');
let Mailer = require('../../services/Mailer');
let emailTemplate = require('../../services/emailTemplates/emailTempResetPassword');


//@route    GET api/auth
//@desc     Get user
//@access   private
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);

    } catch (error) {

        res.status(500).send('server error')
    }
});


//@route    POST api/auth/
//@desc     Auth user and get login user
//@access   public
router.post('/', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(404).json({ errors: errors.array() });
        }

        const { email, password } = req.body


        try {
            let user = await User.findOne({ email: email });

            if (!user) {
                return res.status(400).json({
                    errors: [{
                        msg: 'Invalid Credentials'
                    }]
                })
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({
                    errors: [{
                        msg: 'Invalid Credentials'
                    }]
                })
            }


            const payload = {
                user: {
                    id: user.id,
                    role: user.role
                }
            }


            jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 36000 }, (err, token) => {
                if (err) throw err;
                return res.json({ token });
            });


        } catch (error) {
            console.log('error', error);
            res.status(404).json({ msg: 'Comment not found' });
            // res.status(500).send('Server error')
        }
    });


// @desc Update password
// @route Put api/auth/updatepassword
// @access Private
router.put('/updatepassword', auth, async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).select('+password');
        //check current password
        const isMatch = await bcrypt.compare(req.body.currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({
                errors: [{
                    msg: 'Password do not match'
                }]
            })
        }

        //Set new password
        const salt = await bcrypt.genSalt(10);

        let hashedpassword = await bcrypt.hash(req.body.newPassword, salt);

        user.password = hashedpassword;

        await user.save();


        const payload = {
            user: {
                id: user.id,
                role: user.role
            }
        }

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 36000 }, (err, token) => {
            if (err) throw err;
            return res.json({ token });
        });

    } catch (error) {
        console.log('error', error);
        // next(error);
    }
})

// @desc Forgot password
// @route POST api/auth/forgotpassword
// @access Public
router.post('/forgotpassword', async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email })

        if (!user) {
            return res.status(400).json({
                errors: [{
                    msg: 'Email Invalid'
                }]
            })
            // return next(new ErrorResponse(`There is no user with that email`, 404));
        }

        //Get reset token
        const resetToken = user.getResetPasswordToken();


        await user.save({ validateBeforeSave: false })
        // const resetUrl = `${req.protocol}://${req.get('host')}/resetpassword/${resetToken}`
        // console.log('resetUrl', resetUrl);
        const resetUrl = `${process.env.REDIRECT_DOMAIN}/reset-password/${resetToken}`

        const email = ({
            title: 'PT Reset Password',
            subject: 'Reset Password',
            body: 'Please find below reset password link',
            // recipients: recipients.split(',').map(email => ({ email: email.trim() })),
            recipients: [{ email: user.email }]
        });

        const mailer = new Mailer(email, emailTemplate(resetUrl));
        await mailer.send();

        res.status(200)
            .json({
                success: true,
                data: 'Email send',
                // url: resetUrl
            })

    } catch (error) {
        res.status(500).send('Server Error')
    }
})

// // @desc Reset password
// // @route PUT api/auth/resetpassword/:resettoken
// // @access Public
router.put('/resetpassword/:resettoken', async (req, res, next) => {
    try {

        //Get hashed token
        const resetPasswordToken = crypto
            .createHash('sha256')
            .update(req.params.resettoken)
            .digest('hex');

        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }
        })

        if (!user) {
            return res.status(400).json({
                errors: [{
                    msg: 'Invaid token'
                }]
            })
            // return next(new ErrorResponse(`invaid token`, 400));
        }

        //Set new password
        const salt = await bcrypt.genSalt(10);
        let hashedpassword = await bcrypt.hash(req.body.password, salt);

        user.password = hashedpassword;
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined

        await user.save();

        const payload = {
            user: {
                id: user.id,
                role: user.role
            }
        }

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 36000 }, (err, token) => {
            if (err) throw err;
            return res.json({ token });
        });


    } catch (error) {
        res.status(500).send('Server Error')
    }
})


module.exports = router;