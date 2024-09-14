import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AppHeader from '../../components/AppHeader';
import MovieCard from '../../components/MovieCard';
import './CategoryPage.css';
import { capitalizeWords } from '../../utils/string';
import { fetchMovieData } from '../../api/data.api';
import { useGlobalContext } from '../../data/context';
import { useInfiniteScroll } from '../../utils/scroll';
import { useRefContext } from '../../data/context';
import { fetchImageInBatch } from '../../api/image.api';

const PAGINATION_COUNT = 20;

const CategoryPage = () => {

  const { category } = useParams();
  const { state, setState } = useGlobalContext();

  const { movies } = state ?? {};
  // console.log({ movies });

  const { rootAppRef, currentPageRef } = useRefContext();

  // Local States
  const [pageNo, setPageNo] = useState(1);
  const [lastPageNo, setLastPageNo] = useState(-1);
  const [networkStatus, setNetworkStatus] = useState('IDLE');

  const capitalizedCategory = capitalizeWords(category.replace(/-/g, ' '));

  // Side Effects
  useEffect(() => {
    fetchMoviesAsync();
  }, []);

  // Helper Functions
  const fetchMoviesAsync = async () => {
    try {
      setNetworkStatus('BUSY');
      const response = await fetchMovieData(pageNo);
      
      // Retrieve poster links for all the movies fetched using the poster-image property inside each movie
      const moviePosterArray = response?.['page']?.['content-items']?.['content']?.map(eachMovie => eachMovie['poster-image']);

      // Compacting the posterLinks array to remove repeated occurences and filtering out posters with 'missing' keyword
      const compactMoviePosterArray = [...new Set(moviePosterArray)].filter(poster => {
        if (!poster.includes('missing')) { return poster }
      });

      const imagesArray = await fetchImageInBatch(compactMoviePosterArray);

      const images = imagesArray.reduce((acc, obj) => {
        return Object.assign(acc, obj);
      }, {});

      const totalMoviesAvailable = response?.['page']?.['total-content-items'] ?? 0;
      const totalPageCount = Math.ceil(totalMoviesAvailable / PAGINATION_COUNT); 

      // Generating and adding unique Id while preparing the array for render
      let idCounter = 0;
      const moviesArrayWithPosterLink = response?.['page']?.['content-items']?.['content'].map(eachMovie => {
        return {
          ...eachMovie,
          posterLink: images?.[eachMovie?.['poster-image']],
          id: `id-${Date.now()}-${idCounter++}`
        }
      })
      const movies = [
        ...state?.['movies'] ?? [],
        ...moviesArrayWithPosterLink ?? []
      ]

      setState({
        ...state,
        movies
      });
      setPageNo(pageNo + 1);
      setLastPageNo(totalPageCount);
      setNetworkStatus('IDLE');
    } catch(error) {
      console.log("Encountered follwoing error while fetching movies: ", error);
    }
  };

  const loadMoreMovies = () => {
    if (pageNo <= lastPageNo && networkStatus === 'IDLE') fetchMoviesAsync();
  };

  // This hook will initiate the load more when the scroll reaches 50% of the page
  useInfiniteScroll({ rootAppRef, currentPageRef, loadMore: loadMoreMovies });

  return (
    <div className='page' ref={currentPageRef}>
      <AppHeader category={capitalizedCategory}/>
      <div className='content' id='movie-card-grid'>
        {
          movies?.map((eachMovie) => {
            const id = eachMovie['id'];
            const movieTitle = eachMovie['name'];
            const moviePosterLink = eachMovie['posterLink'];

            // console.log({link: eachMovie.posterLink});
            
            return <MovieCard title={movieTitle} poster={moviePosterLink} key={id}/>
          })
        }
      </div>
    </div>
  )
}

export default CategoryPage