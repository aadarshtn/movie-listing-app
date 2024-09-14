import React, { useState, useEffect, useRef } from 'react'
import './AppHeader.css';
import backIcon from '../../assets/back-icon.png';
import hamburgerIcon from '../../assets/hamburger.png';
import searchIcon from '../../assets/search-icon.png';

const AppHeader = ({ isRootDirectory = true, category='Romantic Comedy' }) => {

  // States
  const [searchText, setSearchText] = useState(null);

  // DOM Refs
  const searchInputRef = useRef(null);

  // Helper Funtions
  const handleSearchIconClick = () => {
    if (!searchText) {
      setSearchText("");
    } else {
      if (searchInputRef.current) searchInputRef.current.focus()
    }
  }

  const handleSearch = (e) => {
    setSearchText(e?.target?.value);
  }

  const handleSearchInputBlur = () => {
    if (!searchText) setSearchText(null);
  }

  // Side Effects
  useEffect(() => {
    if (typeof searchText === 'string') {
      if (searchInputRef.current) searchInputRef.current.focus()
    }
  }, [searchText])

  return (
    <div id='header-container'>
      <div id='header-left-wrap'>
        <img
          src={isRootDirectory ? hamburgerIcon : backIcon}
          alt={'back-icon'} id='action-button'
        />
        {
          typeof searchText === 'string' ? (
            <input
              type={'text'}
              placeholder={'Search Favourite Movies here'}
              id='header-search-box'
              ref={searchInputRef}
              onChange={handleSearch}
              onBlur={handleSearchInputBlur}
            />
          ) : (
            <div>
              {
                isRootDirectory ? 'Filmy : Home' : 'Romantic Comedy'
              }
            </div>
          )
        }
        
      </div>
      <div id='header-right-wrap'>
        <img
          src={searchIcon}
          alt={'search-icon'} id='search-button'
          onClick={handleSearchIconClick}
        /> 
      </div>
    </div>
  )
}

export default AppHeader