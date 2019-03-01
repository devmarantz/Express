const express = require('express');
const shortid = require('shortid');
const moment = require('moment');
const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const commentData = require('../data');

// create the db file if it doesn't exist
// and seed it with data
const adapter = new FileSync('db.json', {
    defaultValue: { comments: commentData},
});

const db = lowdb(adapter);

const router = express.Router();

// get all comments
router.get('/', (req,res) => {
    const comments = db.get('comments').value();
    res.json(comments);
});

// get a single comment by id
router.get('/:id', (req,res) => {
    const myComment = db.get('comments').find({id: req.params.id}).value();
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
    db.get('comments').push(newComment).write()
    // return all the comments (make sure the new comment is included!)
    res.status(201).json({ msg: 'Comment Succesfully created', comments: db.get('comments').value()});
    // BONUS: if request has no body text (or text is empty) send proper error code and a message
});

// delete comment
router.delete('/:id', (req,res) => {
    // check if the db has a comment with id of req.params.id
    if(!db.get('comments')
        .find({id: req.params.id})
        .value()
    ) {
        return res.status(404).json({msg:'Invalid ID'});
    }

    db.get('comments').remove({id: req.params.id}).write();

    res.status(200).json({ msg: 'Comment Succesfully deleted', comments: db.get('comments').value()});
});

// update comment
router.put('/:id', (req,res) => {
    if(!req.body.text) {
        return res.status(400).json({msg: 'Invalid syntax'});
    }

    // check if the db has a comment with id of req.params.id
    if(!db.get('comments').find({id: req.params.id}).value()) {
        return res.status(404).json({msg:'Invalid ID'});
    }

    db.get('comments')
        .find({id: req.params.id})
        .assign({text: req.body.text})
        .write();

    return res.json(db.get('comments').value());
});

module.exports = router;