import React from 'react'
import AppHeader from '../../components/AppHeader';
import CategoryCard from '../../components/CategoryCard';
import './HomePage.css';
import '../../App.css';

import { useRelativeRouteNavigation } from '../../utils/routing';

const HomePage = () => {

  return (
    <div className='page'>
      <AppHeader isRootDirectory={true}/>
      <div className='content'>
        <CategoryCard label={'Comedy'} onCategoryCardClick={useRelativeRouteNavigation}/>
        <CategoryCard label={'Romantic'} onCategoryCardClick={useRelativeRouteNavigation}/>
        <CategoryCard label={'Thriller'} onCategoryCardClick={useRelativeRouteNavigation}/>
        <CategoryCard label={'Action'} onCategoryCardClick={useRelativeRouteNavigation}/>
        <CategoryCard label={'Drama'} onCategoryCardClick={useRelativeRouteNavigation}/>
        <CategoryCard label={'Classic Comedy'} onCategoryCardClick={useRelativeRouteNavigation}/>
      </div>
    </div>
  )
}

export default HomePage