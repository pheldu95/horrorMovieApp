const express = require('express');
const router = express.Router();
const axios = require('axios');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/:userId', upload.single('image'), (req, res) => {
    let queryText = `INSERT INTO reviews (movie_id, user_id, score, review, timestamp)
                    VALUES ($1, $2, $3, $4, $5);`;
    pool.query(queryText, [])
        .then(result => {
            res.sendStatus(201);
        }).catch(error => {
            console.log('error adding review to db');
            res.sendStatus(500);
        })
});