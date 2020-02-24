const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const User = require('../../models/User');
const auth = require('../../middleware/auth');
const { authorize } = require('../../middleware/authorize');
const Package = require('../../models/Package');
const Session = require('../../models/Session');
let { ObjectID } = require('mongodb');

// @desc    Get all sessions related to packages
// @route   GET api /sessions/:packageId/session
// @access  Private
router.get('/package/:packageId/user', auth, async (req, res) => {
    try {
        const session = await Session.find({ package: req.params.packageId })

        res.json(session)
    } catch (error) {

        res.status(500).send('Server Error')
    }
})

// @desc    Get all single sessions not related to packages related to user - single sessions
// @route   GET api/v1/session//package/single/:user
// @access  Private
router.get('/package/user', auth, async (req, res) => {
    try {
        let session = await Session.find({
            package: null, "users.user": req.user.id
        }).sort({ startDate: -1 });

        res.json(session);
    } catch (error) {

        res.status(500).send('Server Error')
    }
})

// @desc    Create a session that is o a related package
// @route   POST api/v1/session
// @route   POST api/v1/session/:packageId/session
// @access  Private
router.post('/package/:packageId', auth, async (req, res) => {
    try {

        // req.body.package = req.params.packageId;

        const package = await Package.findById(req.params.packageId);

        const { users } = package

        const newUsers = users.map(({ name, user }) => { return { name, user } })


        const newSession = {
            status: req.body.status,
            type: req.body.type, //group // individaul
            startDate: req.body.startDate,
            package: package._id,
            admin: req.user.id,
            users: newUsers,
        }

        const session = await new Session(newSession).save();

        res.status(200).json({
            success: 'true',
            data: session
        })


    } catch (error) {
        res.status(500).send('Server Error')
    }
})


/* ADMIN */

// @route   GET api /sessions/:packageId/session
// @desc    Get all sessions related to single package
// @access  Private
router.get('/package/:packageId', [auth, authorize('admin')], async (req, res) => {
    try {
        console.log('hit')
        const session = await Session.find({ package: req.params.packageId })
        res.json(session)

    } catch (error) {

        res.status(500).send('Server Error')
    }
})

// @desc  Create a single session that is not related to a package
// @route POST api/session/single/:user
// @access Private
router.post('/single/:user', [auth, authorize('admin')], async (req, res) => {
    try {
        const user = await User.findById(req.params.user).select('id firstName lastName');

        console.log('req.body', req.body);

        const newSession = {
            type: req.body.type, // individual or group
            status: req.body.status,
            admin: req.user.id,
            startDate: req.body.startDate,
            users: [
                {
                    name: `${user.firstName} ${user.lastName}`,
                    user: user.id
                }
            ]
        }

        const session = await new Session(newSession).save();

        res.json(session);

    } catch (error) {

        res.status(500).send('Server Error')
    }
});

// @route   GET api/session/package/single/:user
// @desc    Get all single sessions not related to packages
// @access  Private
router.get('/package/single/:user', [auth, authorize('admin')], async (req, res) => {
    try {
        let session = await Session.find({
            package: null, "users.user": req.params.user,

        }).sort({ startDate: -1 });
        res.json(session);
    } catch (error) {
        res.status(500).send('Server Error')
    }
});

//@route    Delete api/session
//@desc     delete package by id
//@access   private
router.delete('/:id', [auth, authorize('admin')], async (req, res) => {
    try {

        if (!ObjectID.isValid(req.params.id)) {
            return res.status(404).send('Session not found');
        }

        const session = await Session.findById(req.params.id);

        if (!session) {
            return res.status(404).send('Post not found')
        }

        await session.remove();
        res.json({ msg: 'post removed' })

    } catch (error) {
        res.status(500).send('Server Error')
    }
})

module.exports = router;