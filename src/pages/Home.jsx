import MovieCard from "../components/MovieCard"
import { useState, useEffect  } from "react"
import {searchMovies, getPopularMovies} from "../services/api"
import "../css/Home.css"

function Home(){
    const [searchQuery, setSearchQuery] = useState("")
    const [movies , setMovies]= useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)



    useEffect(()=>{

        const loadPopularMovies = async ()=>{
            try{
                const popularMovies = await getPopularMovies()
                setMovies(popularMovies)

            }
            catch(error){
                console.log(error)
                setError("Failed to load ....")

            }
            finally{
                setLoading(false)

            }

        }
        loadPopularMovies()
    },[])

    const handleSearch = async (e)=>{
        e.preventDefault()
        if(!searchQuery.trim()) return 
        if(loading) return 
        setLoading(true)
        try{
            const searchResult = await searchMovies(searchQuery)
            setMovies(searchResult)
            setError(null)
        }
        catch(error){
            console.llog(error)
            setError("Failed to search movies .......")
        }finally{
            setLoading(false)

        }
    }
return <div>
    <form onSubmit={handleSearch} className="search-form">

        <input type="text"
        placeholder="search for movies.." 
        className="search-button" 
        value ={ searchQuery} 
        onChange={(e)=> setSearchQuery(e.target.value)} />

        <button type=" submit" className="search-button" >
            Search

        </button>
    </form>
    
{loading ? (
    <div className="loading" >
        loading....
    </div>
)
:(
    <div className="movie-grid" >
        {movies.map(movie=>(
            <MovieCard movie={movie} key={movie.id}/> 
        ))}
    </div>
)}
</div>
}

export default Home 

