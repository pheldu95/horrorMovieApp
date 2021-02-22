export function watchListChecker (movieId, watchList )  {
    let check = false;
    for(let movie of watchList){
        if(movie.id === movieId){
            check = true;
        } 
    }
    return(check);
}