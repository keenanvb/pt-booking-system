const express = require('express');
const router = express.Router();
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const path = require('path');
const multerConfig = require('../../middleware/multer');
const mongoose = require('mongoose')
const mongodb = require('mongodb');
const multer = require('multer');
const conn = mongoose.connection
const { ObjectID } = require('mongodb');

//init stream
let GridFSBucket
conn.once('open', () => {
    GridFSBucket = new mongodb.GridFSBucket(conn.db, {
        bucketName: 'uploads',
    });
});


//@route    GET api/profile/me
//@desc     Get current user profile
//@access   private
router.get('/me', auth, async (req, res) => {
    try {

        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);


        if (!profile) {
            return res.status(400).json({ msg: 'There is no profile for user' })
        }

        res.json(profile)

    } catch (error) {

        res.status(500).send('Server Error')
    }
});

//@route    POST api/profile/
//@desc     Create or update user profile
//@access   private
router.post('/', [auth,
    [
        // check('status', 'Status is required').not().isEmpty(),
    ]
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { company, website, location, bio, status,
        youtube, facebook, twitter, instagram, linkedin } = req.body;


    // Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;

    // Build social object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    try {
        let profile = await Profile.findOne({ user: req.user.id });

        if (profile) {
            // Update
            profile = await Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true }
            );

            return res.json(profile);
        }

        // Create
        profile = new Profile(profileFields);

        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route    POST api/profile/
//@desc     Get all profiles
//@access   public
router.get('/', async (req, res) => {

    try {
        const profiles = await Profile.find().populate('user', ['firstName', 'lastName']);

        if (!profiles) {
            return res.status(400).json({ msg: 'There is no profiles' })
        }

        res.json(profiles);

    } catch (error) {

        res.status(500).send('Server Error')
    }
});

//@route    POST api/user/:user_id
//@desc     Get profile BY USER ID
//@access   public
router.get('/user/:user_id', async (req, res) => {

    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['firstName', 'lastName']);

        if (!profile) {
            return res.status(400).json({ msg: 'Profile not found' })
        }

        res.json(profile);

    } catch (error) {

        if (error.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'Profile not found' })
        }


        res.status(500).send('Server Error')
    }
});

//@route    DELETE api/profile/
//@desc     Delete profile,user & posts
//@access   private
// router.delete('/', auth, async (req, res) => {

//     try {
//         //Remove posts
//         await Post.deleteMany({ user: req.user.id });
//         //Remove the profile
//         await Profile.findOneAndRemove({ user: req.user.id });
//         //Remove user
//         await User.findOneAndRemove({ _id: req.user.id });


//         res.json({ msg: 'User has been deleted' })

//     } catch (error) {

//         res.status(500).send('Server Error')
//     }
// });

//@route    PUT api/profile/goal 
//@desc     Add goal to profile
//@access   private
router.put('/goal', [auth,
    [
        // check('title', 'Title is required').not().isEmpty(),
        // check('company', 'Company is required').not().isEmpty(),
        // check('from', 'From is required').not().isEmpty()
    ]
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { text } = req.body

    const newGoal = {
        text
    }

    try {
        const profile = await Profile.findOne({ user: req.user.id })

        profile.goals.unshift(newGoal);

        await profile.save()

        res.json(profile);

    } catch (error) {

        res.status(500).send('Server Error')
    }
});

//@route    DELETE api/profile/goal
//@desc     Delete goal by id from profile
//@access   private
router.delete('/goal/:goal_id', auth, async (req, res) => {

    try {
        const profile = await Profile.findOne({ user: req.user.id })

        // Get Remove index
        const removeIndex = profile.goals
            .map(item => item.id)
            .indexOf(req.params.goal_id);

        profile.goals.splice(removeIndex, 1);

        await profile.save();

        res.json(profile);

    } catch (error) {

        res.status(500).send('Server Error')
    }
});

//@route    PUT api/profile/goal 
//@desc     Add profile stats
//@access   private
router.put('/stats', [auth,
    [
        // check('title', 'Title is required').not().isEmpty(),
        // check('company', 'Company is required').not().isEmpty(),
        // check('from', 'From is required').not().isEmpty()
    ]
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { weight, fatPercentage, totalbodywater, muscle, boneDensity,
        rightArm, leftArm, rightLeg, leftLeg, hip, belly, butt
    } = req.body

    const newStat = {
        weight, fatPercentage, totalbodywater, muscle, boneDensity,
        rightArm, leftArm, rightLeg, leftLeg, hip, belly, butt
    }

    try {
        const profile = await Profile.findOne({ user: req.user.id })

        profile.stats.unshift(newStat);

        await profile.save()

        res.json(profile);

    } catch (error) {

        res.status(500).send('Server Error')
    }
});

//@route    DELETE api/profile/stats
//@desc     Delete stats by id from profile
//@access   private
router.delete('/stats/:status_id', auth, async (req, res) => {

    try {
        const profile = await Profile.findOne({ user: req.user.id })

        // Get Remove index
        const removeIndex = profile.stats
            .map(item => item.id)
            .indexOf(req.params.status_id);

        profile.stats.splice(removeIndex, 1);

        await profile.save();

        res.json(profile);

    } catch (error) {

        res.status(500).send('Server Error')
    }
});

// @desc    upload photo for profile
// @route   PUT api/user/uploadPhoto
// @access  Private
router.put('/photo', [auth, multer(multerConfig).single('file')], async (req, res) => {
    try {
        // const user = await User.findById(req.user.id)

        const profile = await Profile.findOne({ user: req.user.id })

        if (!profile) {
            return res.status(400).json({ msg: 'There is no profile' })
        }

        // //make sure that the image is a photo
        // if (!file.mimetype.startsWith('image')) {

        //     return res.status(500).send('Server Error')
        //     // return next(new ErrorResponse(`Please upload an image file`, 400));
        // }

        // //check file size
        // if (file.size > process.env.MAX_FILE_UPLOAD) {
        //     console.log(`Please upload an image file less than ${process.env.MAX_FILE_UPLOAD}`)
        //     // return next(new ErrorResponse(`Please upload an image file less than ${process.env.MAX_FILE_UPLOAD}`, 400));
        // }

        await Profile.findByIdAndUpdate(profile.id, { avatar: req.file.id })

        //Update posts
        await Post.updateMany({ user: req.user.id }, { avatar: req.file.id });

        posts = await Post.find({});

        posts.forEach(async (post, index) => {
            if (post.comments.length > 0) {
                post.comments.forEach(async (comment, index) => {

                    if (comment.user.toString() == req.user.id) {
                        //Update post with comments
                        await Post.updateOne({
                            'comments._id': comment._id,
                            comments: {
                                $elemMatch: { user: req.user.id }
                            }
                        }, {
                            $set: { 'comments.$.avatar': req.file.id }
                        });
                    }

                })
            }
        })




        res.status(200).json('done');

    } catch (error) {
        console.log('error', error)
        res.status(500).send('Server Error')
    }
})


//
// @route GET /photo/:id
// @desc  Display single photo object
//
router.get('/photo/:id', async (req, res) => {

    const imageId = new ObjectID(req.params.id);

    GridFSBucket.openDownloadStream(imageId)
        .on('data', chunk => {
            res.write(chunk);
        })
        .on('error', error => {
            console.log('error', error);
            res.json({ error: error })
        })
        .on('end', () => {
            res.end();
        });
});


//
// @route DELETE /photo/:id
// @desc  Delete photo
//
// router.delete('/photo/:id', auth, async (req, res) => {

//     const imageId = new ObjectID(req.params.id);
//     const profile = await Profile.findOne({ user: req.user.id })

//     GridFSBucket.delete(imageId, async (error) => {
//         if (!imageId) {
//             return res.json(error)
//         } else {
//             await Profile.findByIdAndUpdate(profile.id, { avatar: null })
//             await Post.updateMany({ user: req.user.id }, {
//                 avatar: null
//             });

//             return res.json({ image: 'deleted' })
//         }
//     })
// });

// router.delete('/photo/drop', (req, res) => {

//     GridFSBucket.drop(() => {
//         res.json({ delete: 'all files and chunks' })
//     })
// });


module.exports = router;