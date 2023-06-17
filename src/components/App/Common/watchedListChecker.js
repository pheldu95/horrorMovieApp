export function watchedListChecker(movieId, watchedList) {
    let check = false;
    let idToCheck = Number(movieId);
    for (let movie of watchedList) {
        if (movie.id === idToCheck) {
            check = true;
        }
    }
    return (check);
}