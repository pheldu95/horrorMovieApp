const express = require('express');
const router = express.Router();
const axios = require('axios');
const pool = require('../modules/pool');

router.get('/', (req, res) => {
    console.log(req.user)
    if(req.isAuthenticated()){
        let queryText = `SELECT "movie_id"
                        FROM "watch_list" 
                        WHERE "user_id" = ${req.user.id}
                        ;`;
        pool.query(queryText).then((result) => {
            let movieIds = [];
            for(movie of result.rows){
                movieIds.push(movie.movieId);
            }
            res.send(movieIds);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        });
    }else{
        res.sendStatus(403);
    }
})

//add a movie to user watch list
router.post('/', (req, res) => {
    let item = req.body;
    console.log(item);
    let queryText = `INSERT INTO "watch_list" ("user_id", "movie_id")
                        VALUES ($1, $2)`;
    pool.query(queryText, [item.userId, item.movieId])
    .then(result =>{
        res.sendStatus(201);
    }).catch(error => {
        console.log('error adding to watch list');
        res.sendStatus(500);
    })
});
module.exports = router;

  