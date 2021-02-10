const express = require('express');
const router = express.Router();
const axios = require('axios');
const pool = require('../modules/pool');

router.get('/', (req, res) => {
    
})

//add a movie to user watch list
router.post('/', (req, res) => {
    let item = req.body;
    console.log(item);
    let queryText = `INSERT INTO "watchList" ("userId", "movieId")
                        VALUES ($1, $2)`;
    pool.query(queryText, [item.userId, item.movieId])
    .then(result =>{
        res.sendStatus(201);
    }).catch(error => {
        console.log('error adding to watchList');
        res.sendStatus(500);
    })
});
module.exports = router;

  