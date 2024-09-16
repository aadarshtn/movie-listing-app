import React, { useState, useEffect, useRef } from 'react'
import './AppHeader.css';
import backIcon from '../../assets/back-icon.png';
import { useGoBack } from '../../utils/routing';
import searchIcon from '../../assets/search-icon.png';

const AppHeader = ({
  isRootDirectory = false, category = '', searchText, updateSearchText
}) => {

  // DOM Refs
  const searchInputRef = useRef(null);
  const goBack = useGoBack();

  // Local States
  const [showCharacterLimitTooltip, setShowCharacterLimitTooltip] = useState(false);

  // Helper Funtions
  const handleSearchIconClick = () => {
    if (!searchText) {
      updateSearchText("");
    } else {
      if (searchInputRef.current) searchInputRef.current.focus()
    }
  }

  const handleSearch = (e) => {
    const value = e?.target?.value;

    if (value.length > 15) setShowCharacterLimitTooltip(true)
    else setShowCharacterLimitTooltip(false);

    updateSearchText(e?.target?.value)
  }

  const handleSearchInputBlur = () => {
    if (!searchText) updateSearchText(null)
  }

  const handleActionButtonClick = () => {
    if (!isRootDirectory) {
      goBack();
    }
  }

  // Side Effects
  useEffect(() => {
    if (typeof searchText === 'string') {
      if (searchInputRef.current) searchInputRef.current.focus()
    }
  }, [searchText]);

  return (
    <div id='header-container'>
      <div id='header-left-wrap'>
        <img
          src={isRootDirectory ? `${process.env.PUBLIC_URL}/logo.jpeg` : backIcon}
          alt={'action-icon'} id='action-button'
          onClick={handleActionButtonClick}
        />
        {
          typeof searchText === 'string' ? (
            <div className='input-wrapper'>
              <input
                type={'text'}
                placeholder={'Search Movies'}
                id='header-search-box'
                ref={searchInputRef}
                onChange={handleSearch}
                onBlur={handleSearchInputBlur}
              />
              {showCharacterLimitTooltip && (
                <div id='search-warning-tooltip'>
                  Try a smaller keyword!
                </div>
              )}
            </div>
          ) : (
            <div>
              {
                isRootDirectory ? 'Diagnal : Home' : category
              }
            </div>
          )
        }
        
      </div>
      {
        !isRootDirectory ? (
          <div id='header-right-wrap'>
            <img
              src={searchIcon}
              alt={'search-icon'} id='search-button'
              onClick={handleSearchIconClick}
            />
          </div>
        ) : null
      }
    </div>
  )
}

export default AppHeader