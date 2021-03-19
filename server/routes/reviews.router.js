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

//check if user has submitted a review already

module.exports = router;