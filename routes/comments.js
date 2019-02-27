const express = require('express');
const shortid = require('shortid');
const moment = require('moment');
const commentData = require('../data');

const router = express.Router();

// get all comments
router.get('/', (req,res) => {
    res.json(commentData);
});

// get a single comment by id
router.get('/:id', (req,res) => {
    const myComment = commentData.find(comment => 
        comment.id === parseInt(req.params.id));
    if(myComment){
        res.send(myComment);
    } else {
        res.status(404).json({msg:'Invalid ID'});
    }
});

// create a comment
router.post('/', (req,res) => {
    if(!req.body.text){
        res.status(400).json({msg: 'Invalid syntax: please provide comment text'})
    }
    // create a new comment with the text
    // timestamp: moment().format()
    // id should be shortid
    const newComment = {
            text: req.body.text,
            id: shortid.generate(),
            timestamp: moment().format()
    };
    // add to comment data
    commentData.push(newComment);
    // return all the comments (make sure the new comment is included!)
    res.status(201).json({ msg: 'Comment Succesfully created', comments: commentData});
    // BONUS: if request has no body text (or text is empty) send proper error code and a message
});

// delete comment
router.delete('/:id', (req,res) => {
    // Get comment id
    const myComment = commentData.find(comment => 
        comment.id === parseInt(req.params.id));
    const indexComment = commentData.indexOf(myComment);
    if(myComment){
        // Use comment id and delete comment
        commentData.splice(indexComment, 1);

        res.status(204).json({ msg: 'Comment Succesfully deleted', comments: commentData});
    } else {
        res.status(400).json({msg:'Bad Request'});
    }
});

// update comment
router.put('/:id', (req,res) => {
    // Get comment id
    const myComment = commentData.find(comment => 
        comment.id === parseInt(req.params.id));
    if(myComment){
        
        const indexComment = commentData.indexOf(myComment);
        const newComment = {
        text: req.body.text,
        id: parseInt(req.params.id),
        timestamp: moment().format()
        };
        // Use comment id and delete comment
        commentData.splice(indexComment, 1, newComment);
        // res.status(201).json({ msg: 'Comment Succesfully replaced', commentData});
        res.json(commentData);
    } else {
        res.status(404).json({msg:'Invalid ID'});
    }
});

module.exports = router;