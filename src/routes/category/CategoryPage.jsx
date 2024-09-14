import React from 'react';
import { useParams } from 'react-router-dom';
import AppHeader from '../../components/AppHeader';
import MovieCard from '../../components/MovieCard';
import './CategoryPage.css';
import { capitalizeWords } from '../../utils/string';

const CategoryPage = () => {

  const { category } = useParams();

  const capitalizedCategory = capitalizeWords(category.replace(/-/g, ' '));

  return (
    <div className='page'>
      <AppHeader category={capitalizedCategory}/>
      <div className='content' id='movie-card-grid'>
        <MovieCard/>
        <MovieCard/>
        <MovieCard/>
        <MovieCard/>
        <MovieCard/>
        <MovieCard/>
        <MovieCard/>
        <MovieCard/>
        <MovieCard/>
        <MovieCard/>
        <MovieCard/>
      </div>
    </div>
  )
}

export default CategoryPage