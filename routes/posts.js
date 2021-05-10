const { json } = require('body-parser');
const express = require('express');
const router = express.Router();
const Post = require('../models/Post');



// localhost:3000/ -> dostajemy wszystkie dane
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    }
    catch (err) {
        res.json({ message: err });
    }
});

router.get('/specific', (req, res) => {
    res.send('specific post');
});

// wysylamy do 
router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });

    console.log("trying to add a post");
    console.log(post);

    try {
        const savedPost = await post.save();
        res.json(savedPost);
    } catch (err) {
        res.json({ message: err });
        console.log(err);
    }

});

//specific post
router.get('/:postId', async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        res.json(post);
    } catch (err) {
        res.json({ message: err });
    }
});

//delete a post
router.delete('/:postId', async (req, res) => {
    try {
        const removedPost = await Post.remove({ _id: req.params.postId });
        res.json(removedPost);
    }
    catch (err) {
        res.json({ message: err });
    }
});


//update a post
router.patch('/:postId', async (req, res) => {
    try {
        const updatedPost = await Post.updateOne(
            { _id: req.params.postId },
            {
                $set: {
                    title: req.body.title,
                    description: req.body.description
                }
            }
        );
        res.json(updatedPost);
    }
    catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;