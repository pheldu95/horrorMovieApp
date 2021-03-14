const express = require('express');
const router = express.Router();
const axios = require('axios');
const pool = require('../modules/pool');

//get all subgenres
router.get('/', (req, res) => {
    let queryText = 'Select * FROM subgenres;'
    pool.query(queryText).then((response) => {
        res.send(response);
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
})

router.get('/:movieId', (req, res) => {
    let movieId = req.params.movieId;
    let queryText = `SELECT subgenres.name, subgenres.id, movie_to_subgenre.count FROM subgenres JOIN movie_to_subgenre ON movie_to_subgenre.subgenre_id = subgenres.id WHERE movie_to_subgenre.movie_id = ${movieId};`;
    pool.query(queryText).then((response) => {
        res.send(response);
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
})

router.post('/:movieId', (req, res) => {
    let subgenreId = req.body.subgenre;
    let movieId = req.params.movieId;
    console.log(subgenreId, movieId);

    let queryText = `INSERT INTO movie_to_subgenre (movie_id, subgenre_id) VALUES (${movieId}, ${subgenreId});`;
    pool.query(queryText)
        .then(result => {
            res.sendStatus(201);
        }).catch(error => {
            console.log('error adding subgenre for movie');
            res.sendStatus(500);
        })
});

router.put('/:movieId', (req, res) => {
    let movieId = req.params.movieId;
    let subgenre = req.body.subgenre;

    let queryText = `UPDATE "movie_to_subgenre" SET count = count+1
                    WHERE "movie_id" = ${movieId} AND "subgenre_id" = ${subgenre};`;
    pool.query(queryText).then((results) => {
        res.sendStatus(200);
    }).catch((err) => {
        res.sendStatus(500);
        console.log(err);
    })
})

router.get('/getSubgenreMovies/:subgenreId', (req, res) => {
    let subgenreId = req.params.subgenreId;
    console.log(subgenreId);
    
    let queryText = `SELECT count, movie_id
                    FROM movie_to_subgenre
                    WHERE subgenre_id = $1 ORDER BY count DESC;`;
    pool.query(queryText, [subgenreId]).then((response) => {
        res.send(response);
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
})

module.exports = router;