const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/popular/:page', (req, res) => {
    let page = req.params.page;
    //put our variable from .env in here in place of the api key
    // can add a limit to the end. only recieve certain results. this limit will make it so it only sends back 2
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&with_genres=27&page=${page}`)
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
router.get('/search/:query', (req, res) => {
   //send the page number as well as the search query phrase to here
   let query = req.params.query;
   let pages = 0;
   let horrorMovies = [];
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&query=${query}&include_adult=false`)
        .then((response) => {
            //console.log(response);
            pages = response.data.total_pages;
            for (let i = 0; i < pages; i++) {
                axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&query=${query}&page=${i}&include_adult=false`)
                    .then((response) => {
                        for (let movie of response.data.results) {
                            for(let j = 0; j < movie.genre_ids.length; j++){
                                if (movie.genre_ids[j] === 27){
                                    console.log(movie.title);
                                    
                                    horrorMovies.push(movie);
                                }
                            }
                        }
                        res.send(200);
                    }).catch((error) => {
                        console.log(error);
                    })
            }
            console.log(horrorMovies);
            
            res.send(horrorMovies);
        }).catch((error) => {
            console.log(error);
        })
})
module.exports = router;

  