import React, { useState, useEffect, useRef, useMemo } from 'react';
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
import EndOfPage from '../../components/EndOfPage';
import NoMoviesFound from '../../components/NoMoviesFound';

const PAGINATION_COUNT = 20;

const CategoryPage = () => {

  const { category } = useParams();
  const { state = {}, setState } = useGlobalContext();

  const movies = state[`${category}-movies`];
  const filteredMovies = state['filteredMovies'];
  const categoryPagesFetched = state[`${category}-pages-fetched`];
  const categoryLastPage = state[`${category}-last-page`];

  const { rootAppRef, currentPageRef } = useRefContext();

  // Local States
  const [pageNo, setPageNo] = useState(categoryPagesFetched ?? 0);
  const [lastPageNo, setLastPageNo] = useState(categoryLastPage ?? -1);
  const [localSearchText, setLocalSearchText] = useState(null);

  // Local Refs
  const networkStatusRef = useRef('IDLE');

  const capitalizedCategory = capitalizeWords(category.replace(/-/g, ' '));

  // Helper Functions
  const fetchMoviesAsync = async () => {
    if (networkStatusRef.current === 'BUSY' || ((lastPageNo > 0) && (pageNo >= lastPageNo))) return;
    try {
      networkStatusRef.current = 'BUSY';
      const response = await fetchMovieData(pageNo + 1);
      
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
        ...state?.[`${category}-movies`] ?? [],
        ...moviesArrayWithPosterLink ?? []
      ]

      setState({
        ...state,
        [`${category}-movies`]: movies,
        [`${category}-pages-fetched`]: pageNo + 1,
        [`${category}-last-page`]: lastPageNo
      });
      setPageNo(pageNo + 1);
      setLastPageNo(totalPageCount);
    } catch(error) {
      console.log(`Encountered follwoing error while fetching ${category} movies: `, error);
    }
  };

  const loadMoreMovies = () => {
    if (pageNo <= lastPageNo && networkStatusRef.current === 'IDLE') fetchMoviesAsync();
  };

  const updateSearchText = (val) => {
    setLocalSearchText(val)
  }

  // Side Effects
  // 1. Fetching the movies data for the first time
  useEffect(() => {
    fetchMoviesAsync();
    return () => {
      setState({
        ...state,
        filteredMovies: null
      })
    }
  }, []);

  // 2. This side effect will make sure that when the subsequent movieData API calls or 
  // state update for the same is asyncronously being performed, No repeated API calls will be triggered
  useEffect(() => {
    if (movies?.length === (pageNo * PAGINATION_COUNT)) {
      networkStatusRef.current = 'IDLE';
    }
  }, [movies, pageNo]);

  // 3. This side effect will handle any searchText change and update the render
  useEffect(() => {
    if (localSearchText) {
      const filteredMovies = movies?.filter(movie => movie.name.toLowerCase().includes(localSearchText.toLowerCase()));
      setState({
        ...state,
        searchText: localSearchText,
        filteredMovies
      });
    } else {
      setState({
        ...state,
        searchText: null,
        filteredMovies: null
      })
    }
  }, [localSearchText]);

  // Custom Hooks
  // 1. This hook will initiate the load more when the scroll reaches 50% of the page
  useInfiniteScroll({ rootAppRef, currentPageRef, loadMore: loadMoreMovies });

  const memoizedAppHeader = useMemo(() => <AppHeader category={capitalizedCategory} searchText={localSearchText} updateSearchText={updateSearchText}/>, [localSearchText])

  return (
    <div className='page' ref={currentPageRef}>
      {memoizedAppHeader}
      <div className='content' id='movie-card-grid'>
        {
          (filteredMovies ?? movies)?.map((eachMovie) => {
            const id = eachMovie['id'];
            const movieTitle = eachMovie['name'];
            const moviePosterLink = eachMovie['posterLink'];
            
            return <MovieCard title={movieTitle} poster={moviePosterLink} key={id}/>
          })
        }
      </div>
      {
        !localSearchText && (lastPageNo > 0) && (pageNo >= lastPageNo) ? <EndOfPage/> : null
      }
      {
        (localSearchText && filteredMovies?.length === 0) ? <NoMoviesFound/> : null
      }
    </div>
  )
}

export default CategoryPage