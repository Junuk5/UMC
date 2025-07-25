import { useState, useEffect } from 'react';
import axios from "axios";
import {type Movie} from '../types/movie';
import MovieCard from '../components/MovieCard';

export default function MoviePage() {
        const [movies, setMovies] = useState<Movie[]>([]);

    useEffect((): void => {
        const fetchMovies = async () => {
            const { data } = await axios(
                'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',

                {
                    headers: {
                        Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,

                    },
                }
            );
            setMovies(data.results);
        };

        fetchMovies();
    }, []);


    return (
        <div className='p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
            {movies.map((movie) =>(
                <MovieCard key={movie.id} movie={movie}/>
            ))}
        </div>
    );
}