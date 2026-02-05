import { createContext, useState, useContext, useEffect } from "react"

const MovieContext = createContext()

export const useMoviesContext = () => useContext(MovieContext)

export const MovieProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("favorites")) || []
      setFavorites(stored)
    } catch {
      setFavorites([])
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites))
  }, [favorites])

  const addToFavorites = (movie) => {
    setFavorites(prev =>
      prev.some(m => m.id === movie.id)
        ? prev
        : [...prev, movie]
    )
  }

  const removeFromFavorites = (id) => {
    setFavorites(prev => prev.filter(m => m.id !== id))
  }

  const isFavorite = (id) =>
    favorites.some(m => m.id === id)

  return (
    <MovieContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite
      }}
    >
      {children}
    </MovieContext.Provider>
  )
}
