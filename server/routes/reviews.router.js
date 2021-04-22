const express = require('express');
const router = express.Router();
const axios = require('axios');
const pool = require('../modules/pool');

router.post('/:movieId', (req, res) => {
    let movieId = req.params.movieId;
    let score = req.body.score;
    let review = req.body.review;
    let userId = req.body.userId;
    let timestamp = req.body.timestamp;
    timestamp = timestamp.split('-');
    timestamp = timestamp[0];
    
    let queryText = `INSERT INTO reviews (movie_id, user_id, score, review, timestamp)
                    VALUES ($1, $2, $3, $4, $5);`;
    pool.query(queryText, [movieId, userId, score, review, timestamp])
        .then(result => {
            res.sendStatus(201);
        }).catch(error => {
            console.log('error adding review to db');
            res.sendStatus(500);
        })
});

//get reviews in order of votes. for popular reviews display
router.get('/popular/:movieId', (req, res) => {
    let movieId = req.params.movieId;
    let queryText = `SELECT reviews.id, reviews.review, reviews.score, reviews.timestamp, reviews.votes, reviews.user_id, "user".username FROM reviews
                    JOIN "user" ON "user".id = reviews.user_id
                    WHERE reviews.movie_id = ${movieId}
                    ORDER BY votes DESC;`;
    pool.query(queryText).then((response) => {
        res.send(response);
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
})

//get reviews in order of recency
router.get('/recent/:movieId', (req, res) => {
    let movieId = req.params.movieId;
    let queryText = `SELECT reviews.id, reviews.review, reviews.score, reviews.timestamp, reviews.votes, reviews.user_id, "user".username FROM reviews
                    JOIN "user" ON "user".id = reviews.user_id
                    WHERE reviews.movie_id = ${movieId}
                    ORDER BY timestamp DESC;`;
    pool.query(queryText).then((response) => {
        res.send(response);
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
})

//check if user has submitted a review already
router.get('/:movieId/:userId', (req, res) => {
    let movieId = req.params.movieId;
    let userId = req.params.userId;
    let queryText = `SELECT * FROM reviews
                    WHERE movie_id = $1 AND user_id = $2;`;
    pool.query(queryText, [movieId, userId]).then((response) => {
        res.send(response);
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
})

//delete user's review
router.delete('/:reviewId', (req, res) => {
    let reviewId = req.params.reviewId;
    let queryText = `DELETE FROM reviews WHERE id = ${reviewId}`;
    pool.query(queryText).then((results) => {
        res.sendStatus(200)
    }).catch((err) => {
        res.sendStatus(500);
        console.log('error deleting review', err);
    })
})

module.exports = router;