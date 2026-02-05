import "../css/Favorites.css"
import { useMoviesContext } from "../contexts/MovieContext"
import MovieCard from "../components/MovieCard"

function Favorites() {
  const { favorites } = useMoviesContext()

  if (!favorites.length) {
    return (
      <div className="favorites-empty">
        <h2>No Favorites Yet</h2>
        <p>Start adding movies to your favorites and they will appear here!!</p>
      </div>
    )
  }

  return (
    <div className="favorites">
      <h2>Your Favorites</h2>

      <div className="movies-grid">
        {favorites.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  )
}

export default Favorites