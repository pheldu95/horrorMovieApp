const express = require('express');
const router = express.Router();
const axios = require('axios');
const pool = require('../modules/pool');

router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        let queryText = `SELECT "movie_id"
                        FROM "watched_list" 
                        WHERE "user_id" = ${req.user.id}
                        ;`;
        pool.query(queryText).then((response) => {
            let movieIds = [];
            for (movie of response.rows) {
                movieIds.push(movie.movie_id);
            }
            res.send(movieIds);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(403);
    }
})

//add a movie to user watch list
router.post('/', (req, res) => {
    let item = req.body;
    let queryText = `INSERT INTO "watched_list" ("user_id", "movie_id")
                        VALUES ($1, $2)`;
    pool.query(queryText, [item.userId, item.movieId])
        .then(result => {
            res.sendStatus(201);
        }).catch(error => {
            console.log('error adding to watch list');
            res.sendStatus(500);
        })
});

router.delete('/', (req, res) => {
    let item = req.body;
    let queryText = `DELETE FROM "watched_list" WHERE "user_id" = $1 AND "movie_id" = $2`;
    pool.query(queryText, [item.userId, item.movieId]).then((results) => {
        res.sendStatus(200);
    }).catch((err) => {
        res.sendStatus(500);
        console.log(err);
    })
});
module.exports = router;

