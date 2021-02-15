const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/popular', (req, res) => {
    //put our variable from .env in here in place of the api key
    // can add a limit to the end. only recieve certain results. this limit will make it so it only sends back 2
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&with_genres=27`)
        .then((response) => {
            res.send(response.data.results)
        }).catch((error) => {
            console.log(error);
        })
})

//get movie details
router.get('/details/:id', (req, res) => {
    let id = req.params.id;
    axios.get(` https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`)
        .then((response) => {
            res.send(response.data)
        }).catch((error) => {
            console.log(error);

        })
})

//do a search
router.get('/search', (req, res) => {
   //send the page number as well as the search query phrase to here
   let query = req.body.query;
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1&query=${query}&include_adult=false`)
        .then((response) => {
            res.send(response.data.results)
        }).catch((error) => {
            console.log(error);
        })
})
module.exports = router;

  