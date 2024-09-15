import React from 'react'
import './CategoryCard.css';
import categoryCardBackground from '../../assets/category-card.png';

const CategoryCard = ({ label, onCategoryCardClick }) => {

    const navigateToCategoryHomePage = onCategoryCardClick(label.toLowerCase().replace(/\s+/g, '-'));
    
    return (
        <div id={'category-card-container'} name={'label'} onClick={navigateToCategoryHomePage}>
            <img
                src={categoryCardBackground}
                alt={'category-card'}
                id={'category-background'}
            />
            <div id={'category-label'}>
                {label}
            </div>
        </div>
    )
}

export default CategoryCard