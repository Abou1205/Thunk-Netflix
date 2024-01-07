import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/react-splide/css';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { baseImgURL, options } from '../constant'
import axios from 'axios'

const MovieList = ({genre}) => {
    const [movies,setMovies] = useState(null)

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/discover/movie?with_genres=${genre.id}`, options)
            .then((res) => setMovies(res.data.results))
    },[ ])

  return (
    <div className='p-4'>
        <h1 className='mb-3'>{genre.name}</h1>
        
        <Splide options={{
            gap: '10px',
            autoWidth: true,
            pagination: false
        }}>
            {movies?.map((movie) => (
                <SplideSlide key={movie.id} className='movie-card'>
                    <Link to={`/details/${movie.id}`}>
                        <img className='movie' src={baseImgURL + movie.poster_path} />
                    </Link>
                    
                    <p>
                        <span>{movie.title}</span>
                    </p>
                </SplideSlide>
            ))}
        </Splide>
    </div>
  )
}

export default MovieList