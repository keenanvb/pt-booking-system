const express = require('express');
const moment = require('moment')
const { check, validationResult } = require('express-validator');
const router = express.Router();
const User = require('../../models/User');
const auth = require('../../middleware/auth');
const { authorize } = require('../../middleware/authorize');
const Booking = require('../../models/Booking');
const Package = require('../../models/Package');
let { ObjectID } = require('mongodb');

//@route    GET api/caldendar
//@desc     get package by id
//@access   private
router.post('/calendar', auth, async (req, res) => {
    try {
        const booking = await Booking.find({
            startDate: {
                $gte: new Date(req.body.startDate).toISOString(),
                $lte: new Date(req.body.endDate).toISOString()
            },
            confirmation: true
        })


        if (!booking) {
            return res.status(404).send('Booking not found')
        }

        res.json(booking)
    } catch (error) {
        res.status(500).send('Server Error')
    }
})



//@route    GET api/lastestpackage/
//@desc     Get lastest package
//@access   private
router.get('/packages/latestpackage', auth, async (req, res) => {
    try {
        const package = await Package
            .find({ "users.user": req.user.id, status: 'active' }) // also marked as not done
            .sort({ startDate: -1 })
            .populate('sesh')
        if (!package) {
            return res.status(404).send('package not found')
        }

        res.json(package)

    } catch (error) {

        res.status(500).send('Server Error')
    }
})

//@route    GET api/booking
//@desc     get all bookings
//@access   private
router.get('/', auth, async (req, res) => {
    try {
        const bookings = await Booking
            .find().sort({ startDate: -1 })
            .populate('user', ['name'])


        res.json(bookings)

    } catch (error) {

        res.status(500).send('Server Error')
    }
})

//@route    POST api/packages 
//@desc     create a package with a packageId
//@access   private admin
router.post('/', auth, async (req, res) => {
    try {
        let bookings = req.body.bookings;

        if (req.body.type == 'once-off') {
            let user = await User.findById(req.user.id).select('_id firstName lastName')
            let { _id, firstName, lastName } = user
            let newUserFormate = {
                name: `${firstName} ${lastName}`,
                user: _id
            }

            bookings.forEach(async (session, index) => {
                const newBooking = {
                    type: req.body.type,
                    user: req.user.id,
                    users: [newUserFormate],
                    startDate: session.start,
                    bookedByAdmin: false,
                }
                await new Booking(newBooking).save();
            });
        } else {
            let packageUsers = await Package.findById(req.body.package).select('users')
            const { users } = packageUsers

            bookings.forEach(async (session, index) => {
                const newBooking = {
                    type: req.body.type,
                    package: req.body.package,
                    user: req.user.id,
                    users: users,
                    bookedByAdmin: false,
                    startDate: session.start,
                }

                await new Booking(newBooking).save();
            });
        }


        res.json('complete');
    } catch (error) {

        res.status(500).send('Server Error')
    }
})

//@route    GET api/packages
//@desc     get package by id
//@access   private
router.get('/:id', auth, async (req, res) => {
    try {

        if (!ObjectID.isValid(req.params.id)) {
            return res.status(404).send('Package not found');
        }

        const package = await Package.findById(req.params.id);
        // const package = await Package.findOne({ _id: req.params.id });

        if (!package) {
            return res.status(404).send('Post not found')
        }

        res.json(package)
    } catch (error) {

        res.status(500).send('Server Error')
    }
})

//@route    Delete api/booking
//@desc     delete Booking by id
//@access   private
router.delete('/:id', auth, async (req, res) => {
    try {
        if (!ObjectID.isValid(req.params.id)) {
            return res.status(404).send('Booking not found id');
        }

        const booking = await Booking.findById(req.params.id);

        let end = moment(new Date());
        let start = moment(booking.startDate);
        // let hours = now.diff(start, 'hours')
        // console.log('start', start)
        // console.log('end', end)

        var duration = moment.duration(end.diff(start));
        let hours = duration.hours();

        // check days
        //then check hours
        // if (hours < 4) {
        //     return res.status(501).json({ msg: "User not authorized to remove this booking 4 hours before the scheduled time" })
        // }


        if (booking.user.toString() !== req.user.id) {
            return res.status(501).json({ msg: "User not authorized to remove this booking" })
        }

        //check created dates then compare
        //moment get different of 4 hourz


        if (!booking) {
            return res.status(404).send('Booking not found')
        }

        await booking.remove();
        res.json({ msg: 'booking removed' })

    } catch (error) {
        res.status(500).send('Server Error')
    }
})

//@route    put api/packages/:id
//@desc     update package
//@access   private
router.put('/:id', [auth,
    [
        // check('text', 'Text is required').not().isEmpty()
    ]], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        };

        try {
            let ptPackage = await Package.findById(req.params.id);

            if (!ptPackage) {
                return res.status(404).send('package not found');
            }

            ptPackage = await Package.findOneAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true
            });

            res.json(ptPackage);

        } catch (error) {

            res.status(500).send('Server Error')
        }

    })


//@route    GET api/caldendar/mybooking
//@desc     Get user confirmed bookings
//@access   private
router.post('/calendar/mybooking', auth, async (req, res) => {
    try {

        // Copy req.query
        const reqQuery = { ...req.query }

        // const booking = await Booking.find({
        //     startDate: {
        //         $gte: new Date(req.body.startDate).toISOString(),
        //     },
        //     "users.user": req.user.id
        //     // confirmation: false
        // })

        if (reqQuery.confirmation == 'all') {

            const booking = await Booking.find({
                startDate: {
                    $gte: new Date(req.body.startDate).toISOString(),
                },
                "users.user": req.user.id
            });

            return res.json(booking)
        } else {
            if (reqQuery.confirmation === 'true') {

                const booking = await Booking.find({
                    startDate: {
                        $gte: new Date(req.body.startDate).toISOString(),
                    },
                    "users.user": req.user.id,
                    confirmation: true
                })

                return res.json(booking)
            } else {

                const booking = await Booking.find({
                    startDate: {
                        $gte: new Date(req.body.startDate).toISOString(),
                    },
                    "users.user": req.user.id,
                    confirmation: false
                })

                return res.json(booking)
            }

        }

        if (!booking) {
            return res.status(404).send('Booking not found')
        }

        // res.json(booking)
    } catch (error) {
        res.status(500).send('Server Error')
    }
})


//Admin

//@route    POST api/packages 
//@desc     create a package with a packageId
//@access   private admin
router.post('/admin-calendar-booking', [auth, authorize('admin')], async (req, res) => {
    try {
        let bookings = req.body.bookings;
        if (req.body.type == 'once-off') {

            let user = await User.findById(req.body.user).select('_id firstName lastName');

            let { _id, firstName, lastName } = user
            let newUserFormate = {
                name: `${firstName} ${lastName}`,
                user: _id
            }

            bookings.forEach(async (session, index) => {
                const newBooking = {
                    type: req.body.type,
                    user: req.body.user,
                    users: [newUserFormate],
                    bookedByAdmin: true,
                    startDate: session.start,
                    confirmation: true,
                }

                await new Booking(newBooking).save();
            });
        } else {
            let packageUsers = await Package.findById(req.body.packageId).select('users')
            const { users } = packageUsers

            bookings.forEach(async (session, index) => {
                //get the users from package id
                const newBooking = {
                    type: req.body.type,
                    package: req.body.packageId,
                    user: req.body.user,
                    users: users,
                    bookedByAdmin: true,
                    startDate: session.start,
                    confirmation: true,
                }

                await new Booking(newBooking).save();
            });
        }

        res.json('complete');
    } catch (error) {

        res.status(500).send('Server Error')
    }

})

//@route    GET api/caldendar
//@desc     get package by id
//@access   private
router.post('/admin-calendar', [auth, authorize('admin')], async (req, res) => { //im here
    try {

        const booking = await Booking.find({
            startDate: {
                $gte: new Date(req.body.startDate).toISOString(),
                $lte: new Date(req.body.endDate).toISOString()
            }
        }).populate('user', ['firstName', 'lastName'])
        // .populate('package', ['type'])


        if (!booking) {
            return res.status(404).send('Booking not found')
        }

        res.json(booking)
    } catch (error) {

        res.status(500).send('Server Error')
    }
})

//@route    put api/packages/:id
//@desc     update package
//@access   private
router.put('/admin-calendar/:id', [auth, authorize('admin')], async (req, res) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({ errors: errors.array() });
    // };

    try {
        let booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).send('booking not found');
        }


        booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.json(booking);

    } catch (error) {

        res.status(500).send('Server Error')
    }

})

//@route    Delete api/package
//@desc     delete package by id
//@access   private
router.delete('/admin-calendar/:id', [auth, authorize('admin')], async (req, res) => {
    try {

        if (!ObjectID.isValid(req.params.id)) {
            return res.status(404).send('Post not found id');
        }

        const booking = await Booking.findById(req.params.id);


        if (!booking) {
            return res.status(404).send('Post not found')
        }

        await booking.remove();
        res.json({ msg: 'booking removed' })

    } catch (error) {

        res.status(500).send('Server Error')
    }
});

//@route    GET api/lastestpackage/
//@desc     Get lastest package
//@access   private
router.get('/admin-calendar/latestpackage/:id', [auth, authorize('admin')], async (req, res) => {
    try {

        const package = await Package
            .find(
                {
                    "users.user": req.params.id,
                    status: 'active'
                })
            .sort({ startDate: -1 })

        if (!package) {
            return res.status(404).send('package not found')
        }

        return res.json(package);
    } catch (error) {

        res.status(500).send('Server Error')
    }
})

//@route    GET api/caldendar
//@desc     get package by id
//@access   private
router.post('/admin-calendar/move-session', [auth, authorize('admin')], async (req, res) => {
    try {

        // const bookings = await Booking.find({
        //     startDate: {
        //         $gte: new Date(req.body.startDate).toISOString(),
        //         $lte: new Date(req.body.endDate).toISOString(),
        //     },
        //     confirmation: true,
        //     completed: false
        // }).populate('user', ['firstName', 'lastName'])

        let bookings = req.body.bookings

        bookings.forEach(async (booking, index) => {
            const user = await User.findById(booking.user._id).select('_id, firstName lastName');

            let packageExist = booking.package;
            let newSession = ''
            if (packageExist) {
                const package = await Package.findById(booking.package);
                const { users } = package


                const newUsers = users.map(({ name, user }) => { return { name, user } })

                newSession = {
                    type: booking.type,
                    status: booking.status,
                    package: booking.package,
                    user: req.user.id,
                    startDate: new Date(booking.startDate).toISOString(),
                    booking: booking._id,
                    users: newUsers
                }
            } else {
                newSession = {
                    type: booking.type,
                    status: booking.status,
                    user: req.user.id,
                    startDate: new Date(booking.startDate).toISOString(),
                    booking: booking._id,
                    users: [
                        {
                            name: `${user.firstName} ${user.lastName}`,
                            user: user.id
                        }
                    ]
                }
            }

            await new Session(newSession).save();

            const fieldsToUpdate = {
                completed: true
            }

            await Booking.findByIdAndUpdate(booking._id, fieldsToUpdate, {
                new: true,
                runValidators: true
            });
        });

        if (!bookings) {
            return res.status(404).send('Booking not found')
        }

        res.json([])
    } catch (error) {
        res.status(500).send('Server Error')
    }
})


//@route    POST api/caldendar
//@desc     POST get all confirmed bookings for the day
//@access   private
router.post('/admin-calendar/confirmed-bookings', [auth, authorize('admin')], async (req, res) => {
    try {

        const bookings = await Booking.find({
            startDate: {
                $gte: new Date(req.body.startDate).toISOString(),
                $lte: new Date(req.body.endDate).toISOString(),
            },
            confirmation: true,
            completed: false
        }).populate('user', ['firstName', 'lastName'])


        if (!bookings) {
            return res.status(404).send('Booking not found')
        }

        res.json(bookings)
    } catch (error) {

        res.status(500).send('Server Error')
    }
})



module.exports = router;