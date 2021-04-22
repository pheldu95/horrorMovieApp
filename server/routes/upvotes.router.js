const express = require('express');
const router = express.Router();
const axios = require('axios');
const pool = require('../modules/pool');

//get how many upvotes the review has
router.get('/upvoteCount/:reviewId', (req, res) => {
    let reviewId = req.params.reviewId;
    let queryText = `SELECT SUM(review_votes.vote)
                    FROM review_votes
                    WHERE review_id = ${reviewId};`;
    pool.query(queryText).then((response) => {
        res.send(response.rows[0].sum);
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
})

//get users vote on a review
router.get('/userVote/:reviewId', (req, res) => {
    const userId = req.user.id;
    let reviewId = req.params.reviewId;
    let queryText = `SELECT review_votes.id, review_votes.vote
                    FROM review_votes
                    WHERE review_id = $1 AND user_id = $2;`;
    pool.query(queryText, [reviewId, userId]).then((response) => {
        res.send(response.rows);
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
})

//post upvote
router.post('/up/:reviewId', (req, res) => {
    // console.log('upvote', req.body, req.params);
    let reviewId = req.params.reviewId;
    let userId = req.body.userId;
    let timestamp = req.body.timestamp;
    timestamp = timestamp.split('-');
    timestamp = timestamp[0];
    let queryText = `INSERT INTO review_votes (review_id, user_id, timestamp, vote)
                    VALUES ($1, $2, $3, $4);`;
    pool.query(queryText, [reviewId, userId, timestamp, 1])
        .then(result => {
            res.sendStatus(201);
        }).catch(error => {
            console.log('error adding upvote');
            res.sendStatus(500);
        })
});

//downvote review
router.post('/down/:reviewId', (req, res) => {
    // console.log('downvote', req.body, req.params);
    let reviewId = req.params.reviewId;
    let userId = req.body.userId;
    let timestamp = req.body.timestamp;
    timestamp = timestamp.split('-');
    timestamp = timestamp[0];
    let queryText = `INSERT INTO review_votes (review_id, user_id, timestamp, vote)
                    VALUES ($1, $2, $3, $4);`;
    pool.query(queryText, [reviewId, userId, timestamp, -1])
        .then(result => {
            res.sendStatus(201);
        }).catch(error => {
            console.log('error adding downvote');
            res.sendStatus(500);
        })
});

//delete vote
router.delete('/delete/:reviewId', (req, res) => {
    let reviewId = req.params.reviewId;
    let userId = req.user.id;
    
    let queryText = `DELETE FROM review_votes WHERE review_id = $1 AND user_id = $2;`;
    pool.query(queryText, [reviewId, userId]).then((results) => {
        res.sendStatus(200)
    }).catch((err) => {
        res.sendStatus(500);
        console.log('error deleting vote', err);
    })
});
module.exports = router;