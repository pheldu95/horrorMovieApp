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

//get all tags for a movie
router.get('/:movieId', (req, res) => {
    let movieId = req.params.movieId;
    let queryText = `SELECT tags.name, tags.id, movie_to_tag.count FROM tags JOIN movie_to_tag ON movie_to_tag.tag_id = tags.id WHERE movie_to_tag.movie_id = ${movieId};`;
    pool.query(queryText).then((response) => {
        res.send(response);
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
})

//will try and post the tag, but if it alread exists, will give a bad response
router.post('/:movieId', (req, res) => {
    let tagId = req.body.tag;
    let movieId = req.params.movieId;
    console.log(tagId, movieId);
    
    let queryText = `INSERT INTO movie_to_tag (movie_id, tag_id) VALUES (${movieId}, ${tagId});`;
    pool.query(queryText)
        .then(result => {
            res.sendStatus(201);
        }).catch(error => {
            console.log('error adding tag for movie');
            res.sendStatus(500);
        })
});

//put request to update a tag's count
router.put('/:movieId/', (req, res) => {
    let movieId = req.params.movieId;
    let tag = req.body.tag;
    
    let queryText = `UPDATE "movie_to_tag" SET count = count+1
                    WHERE "movie_id" = ${movieId} AND "tag_id" = ${tag};`;
    pool.query(queryText).then((results) => {
        res.sendStatus(200);
    }).catch((err) => {
        res.sendStatus(500);
        console.log(err);
    })
})

module.exports = router;