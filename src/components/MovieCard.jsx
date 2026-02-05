import '../css/MovieCard.css' 
import {useMoviesContext} from '../contexts/MovieContext'

function MovieCard({movie}){
    const {isFavorite,addToFavorites,removeFromFavorite} = useMoviesContext()
    const favorite= isFavorite(movie.id)

    // when we click the heart button and we find that i arleady exist in the favorites
    // it goes on and off if it exists
    function onFavoriteClick(e){
        e.preventDefault()
        if(favorite) removeFromFavorite(movie.id)
            else addToFavorites
    }
    return <div className='movie-card'>
        <div className='movie-poster'>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.tittle} />
            <div>
                <button className={`favorite-btn ${favorite ? 'active' : ""}`} onclick={onFavoriteClick} >🤍</button>
            </div>
        </div>
        <div>
            <h3>{movie.tittle}</h3>
            <p>{movie.release_date?.split("-")[0] } </p>
        </div>
    </div>


}

export default MovieCard

