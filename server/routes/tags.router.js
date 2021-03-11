const express = require('express');
const router = express.Router();
const axios = require('axios');
const pool = require('../modules/pool');

//get all tags
router.get('/', (req, res) => {
    let queryText = 'Select * FROM tags;'
    pool.query(queryText).then((response) => {
        res.send(response);
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
})

//will try and post the tag, but if it alread exists, will give a bad response
router.post('/', (req, res) => {
    let tagIds = req.body.tagIds;
    let movieId = req.body.movieId;
    let queryText;
    for(tag of tagIds){
        queryText = `SELECT COUNT(1)
                    FROM "movie_to_subgenre"
                    WHERE "movie_id" = ${movieId} AND "subgenre_id" = ${tag};`
        // pool.query(queryText)
        // .then(result => {
        //     console.log(result);
            
        //     res.sendStatus(201);
        // }).catch(error => {
        //     console.log('error adding to watch list');
        //     res.sendStatus(500);
        // })
        
        
    }
    
    // let item = req.body;
    // let queryText = `INSERT INTO "watch_list" ("user_id", "movie_id")
    //                     VALUES ($1, $2)`;
    // pool.query(queryText, [item.userId, item.movieId])
    //     .then(result => {
    //         res.sendStatus(201);
    //     }).catch(error => {
    //         console.log('error adding to watch list');
    //         res.sendStatus(500);
    //     })
});

module.exports = router;