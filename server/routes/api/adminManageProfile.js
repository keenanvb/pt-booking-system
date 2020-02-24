const express = require('express');

const router = express.Router();
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const { authorize } = require('../../middleware/authorize');

//@route    POST api/user/:user_id
//@desc     Get profile BY USER ID
//@access   public
router.get('/user/:userId', [auth, authorize('admin')], async (req, res) => {

    try {
        const profile = await Profile.findOne({ user: req.params.userId }).populate('user', ['firstName', 'lastName']);

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
router.delete('/', [auth, authorize('admin')], async (req, res) => {

    try {
        //Remove posts
        await User.deleteMany({ user: req.user.id });
        //Remove the profile
        await Profile.findOneAndRemove({ user: req.user.id });
        //Remove user
        await User.findOneAndRemove({ _id: req.user.id });


        res.json({ msg: 'User has been deleted' })

    } catch (error) {

        res.status(500).send('Server Error')
    }
});

//@route    PUT api/profile/goal 
//@desc     Add goal to profile
//@access   private
router.put('/user/goal/:userId', [auth, authorize('admin')], async (req, res) => {

    const { text } = req.body

    const newGoal = {
        text
    }

    try {
        const profile = await Profile.findOne({ _id: req.params.userId })

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
router.delete('/goal/:goal_id', [auth, authorize('admin')], async (req, res) => {

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
router.put('/user/stats/:userId', [auth, authorize('admin')], async (req, res) => {

    const { weight, fatPercentage, totalbodywater, muscle, boneDensity,
        rightArm, leftArm, rightLeg, leftLeg, hip, belly, butt
    } = req.body

    const newStat = {
        weight, fatPercentage, totalbodywater, muscle, boneDensity,
        rightArm, leftArm, rightLeg, leftLeg, hip, belly, butt
    }

    try {
        const profile = await Profile.findOne({ _id: req.params.userId })

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
router.delete('/stats/:status_id', [auth, authorize('admin')], async (req, res) => {

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

module.exports = router;