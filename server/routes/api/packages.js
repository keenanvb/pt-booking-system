const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const User = require('../../models/User');
const auth = require('../../middleware/auth');
const Package = require('../../models/Package');
const { authorize } = require('../../middleware/authorize');
let { ObjectID } = require('mongodb');
let Mailer = require('../../services/Mailer');
let emailTemplate = require('../../services/emailTemplates/emailTempPackage');

//@route    GET api/packages  
//@desc     get all packages with sessions 
//@access   private
router.get('/sessions/user', auth, async (req, res) => {
    try {
        const packages = await Package
            .find({ "users.user": req.user.id })
            .sort({ startDate: -1 })
            .populate('sesh')
        res.json(packages)
    } catch (error) {
        res.status(500).send('Server Error')
    }
})

/*ADMIN*/

//@route    GET api/packages/users
//@desc     get all users 
//@access   private - admin
router.get('/users', [auth, authorize('admin')], async (req, res) => {
    try {
        const users = await User.find({})
            .select('-password -resetPasswordExpire -resetPasswordToken').populate('prof', ['avatar'])

        res.json(users);
    } catch (error) {
        res.status(500).send('Server Error');
    }
})

//@route    POST api/packages
//@desc     create a package
//@access   private admin
router.post('/', [auth, authorize('admin')], async (req, res) => {
    try {
        // const admin = await User.findById(req.user.id).select('-password');
        const newPackage = {
            type: req.body.type,
            // admin: req.user.id,
            // user: req.params.userId,
            startDate: req.body.startDate,
            users: req.body.users
        }
        const package = await new Package(newPackage).save();
        res.json(package);
    } catch (error) {
        res.status(500).send('Server Error')
    }

})

//@route    GET api/packages/:user
//@desc     get all packages of a single user and populate with sessions
//@access   private
router.get('/session/:user', [auth, authorize('admin')], async (req, res) => {
    try {

        const packages = await Package
            .find({ "users.user": req.params.user })
            .sort({ startDate: -1 })
            .populate('sesh')


        res.json(packages)

    } catch (error) {
        res.status(500).send('Server Error')
    }
})

//@route    put api/packages/:id
//@desc     update package
//@access   private
router.put('/:id', [auth, authorize('admin')], async (req, res) => {

    try {
        let package = await Package.findById(req.params.id);

        if (!package) {
            return res.status(404).send('package not found');
        }

        package = await Package.findOneAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.json(package);

    } catch (error) {

        res.status(500).send('Server Error')
    }
})

//@route    Delete api/package
//@desc     delete package by id
//@access   private
router.delete('/:id', [auth, authorize('admin')], async (req, res) => {
    try {

        if (!ObjectID.isValid(req.params.id)) {
            return res.status(404).send('Package not found id');
        }

        const package = await Package.findById(req.params.id);

        if (!package) {
            return res.status(404).send('Post not found')
        }

        await package.remove();
        res.json({ msg: 'post removed' })

    } catch (error) {

        res.status(500).send('Server Error')
    }
})

//@route    Get api/package/email
//@desc     Get send email about end of packages
//@access   private
router.get('/email', [auth, authorize('admin')], async (req, res) => {
    try {
        const packages = await Package
            .find({ status: 'active' })
            .sort({ startDate: -1 })
            .populate('sesh')

        let maxSession = 9;

        let newPackages = packages.filter(({ sesh }) => {
            return sesh.length > maxSession
        });

        const email = ({
            title: 'PT Package Notification',
            subject: 'Client Packages',
            body: 'Please find below packages that are coming to an end. Please inform client to renew.',
            // recipients: recipients.split(',').map(email => ({ email: email.trim() })),
            recipients: [{ email: process.env.PT_EMAIL }]
        });


        const mailer = new Mailer(email, emailTemplate(newPackages));
        await mailer.send();

        res.json(packages)
    } catch (error) {
        console.log('error', error);
        res.status(500).send('Server Error')
    }
})

module.exports = router;