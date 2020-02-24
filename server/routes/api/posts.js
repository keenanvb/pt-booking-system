const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const auth = require('../../middleware/auth');
const Post = require('../../models/Post');
let { ObjectID } = require('mongodb');


//@route    POST api/post
//@desc     create post
//@access   private
router.post('/', [auth,
    [
        check('text', 'Text is required').not().isEmpty()
    ]], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        };

        try {
            const user = await User.findById(req.user.id).select('-password');
            const profile = await Profile.findOne({ user: req.user.id });

            console.log('profile', profile);
            const newPost = {
                text: req.body.text,
                name: `${user.firstName} ${user.lastName}`,
                avatar: profile.avatar,
                user: req.user.id
            }

            const post = await new Post(newPost).save();

            res.json(post);

        } catch (error) {

            res.status(500).send('Server Error')
        }

    })


//@route    GET api/post
//@desc     get post
//@access   private
router.get('/', auth, async (req, res) => {
    try {
        const post = await Post.find().sort({ date: -1 }); //-1 latest,recent
        res.json(post)
    } catch (error) {

        res.status(500).send('Server Error')
    }
})

//@route    GET api/post
//@desc     get post by id
//@access   private
router.get('/:id', auth, async (req, res) => {
    try {

        if (!ObjectID.isValid(req.params.id)) {
            return res.status(404).send('Post not found id');
        }
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).send('Post not found')
        }
        res.json(post)
    } catch (error) {

        res.status(500).send('Server Error')
    }
})

//@route    Delete api/post
//@desc     delete post by id
//@access   private
router.delete('/:id', auth, async (req, res) => {
    try {

        if (!ObjectID.isValid(req.params.id)) {
            return res.status(404).send('Post not found id');
        }

        const post = await Post.findById(req.params.id);
        //check user
        if (post.user.toString() !== req.user.id) {
            return res.status(501).json({ msg: "User not authorized to remove this post" })
        }

        if (!post) {
            return res.status(404).send('Post not found')
        }

        await post.remove();
        res.json({ msg: 'post removed' })

    } catch (error) {

        res.status(500).send('Server Error')
    }
})

//@route    Put api/post/like/:id
//@desc     put by id
//@access   private
router.put('/like/:id', auth, async (req, res) => {
    try {

        if (!ObjectID.isValid(req.params.id)) {
            return res.status(404).send('Post not found id');
        }

        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).send('Post not found')
        }

        //check if post already liked by user
        if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ msg: "post already liked" })
        }

        post.likes.unshift({ user: req.user.id })

        await post.save();

        res.json(post.likes)

    } catch (error) {

        res.status(500).send('Server Error')
    }
});

//@route    Put api/post/unlike/:id
//@desc     put by id
//@access   private
router.put('/unlike/:id', auth, async (req, res) => {
    try {

        if (!ObjectID.isValid(req.params.id)) {
            return res.status(404).send('Post not found id');
        }

        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).send('Post not found')
        }

        //check if post already liked by user
        if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({ msg: "Post has not been liked" })
        }

        //get the removed index
        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);
        post.likes.splice(removeIndex, 1);

        await post.save();

        res.json(post.likes)

    } catch (error) {

        res.status(500).send('Server Error')
    }
});


//@route    GET api/post/comment/:id
//@desc     create comment on post
//@access   private
router.post('/comment/:id', [auth,
    [
        check('text', 'Text is required').not().isEmpty()
    ]], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        };

        try {
            const user = await User.findById(req.user.id).select('-password');
            const post = await Post.findById(req.params.id)

            const newComment = {
                text: req.body.text,
                name: `${user.firstName} ${user.lastName}`,
                avatar: user.avatar,
                user: req.user.id
            }

            post.comments.unshift(newComment);

            await post.save()

            res.json(post.comments);

        } catch (error) {

            res.status(500).send('Server Error')
        }

    })

//@route    Delete api/post/comment/:id/:comment_id
//@desc     Delete comment on post
//@access   private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
    try {

        if (!ObjectID.isValid(req.params.id)) {
            return res.status(404).send('Post not found id');
        }

        if (!ObjectID.isValid(req.params.comment_id)) {
            return res.status(404).send('comment not found id');
        }
        const post = await Post.findById(req.params.id);

        //comment
        let comment = post.comments.find(comment => comment.id == req.params.comment_id);

        //comment exists
        if (!comment) {
            return res.status(404).json({ msg: 'Comment not found' });
        }

        //check if usser
        if (comment.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User is not authorized' });
        }

        if (!post) {
            return res.status(404).send('Post not found')
        }


        //get the removed index
        // const removeIndex = post.comments.map(comment => comment.user.toString()).indexOf(req.user.id);
        const removeIndex = post.comments.map(comment => comment.id).indexOf(req.params.comment_id);
        post.comments.splice(removeIndex, 1);

        await post.save();

        res.json(post.comments);

    } catch (error) {

        res.status(500).send('Server Error')
    }
});
module.exports = router;