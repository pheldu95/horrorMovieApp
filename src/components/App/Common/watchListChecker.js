export function watchListChecker (movieId, watchList )  {
    let check = false;
    let idToCheck = Number(movieId);
    for(let movie of watchList){
        if (movie.id === idToCheck){
            check = true;
        } 
    }
    return(check);
}