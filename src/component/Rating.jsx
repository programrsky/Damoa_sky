import React, { useState } from 'react';
import style from '../css/MainRating.module.css';
import StarContent from '../svg/StarContent';
import StarRating from '../svg/StarRating';
import StarRatingHalf from '../svg/StarRatingHalf';
import EmptyStarRating from '../svg/EmptyStarRating';

export default function Rating() {
    const [selectedRating, setSelectedRating] = useState(localStorage.getItem('rating') || '');

    const handleRatingChange = (rating) => {
        setSelectedRating(rating);
        localStorage.setItem('rating', rating);
        printLocalStorage();  // Print local storage after updating it
    };

    const printLocalStorage = () => {
        console.log('Current Local Storage:', JSON.stringify(localStorage, null, 2));
    };

    const renderStars = (fullStars, halfStars, emptyStars) => {
        const stars = [];
        for (let i = 0; i < fullStars; i++) stars.push(<StarRating key={`full-${i}`} />);
        for (let i = 0; i < halfStars; i++) stars.push(<StarRatingHalf key={`half-${i}`} />);
        for (let i = 0; i < emptyStars; i++) stars.push(<EmptyStarRating key={`empty-${i}`} />);
        return stars;
    };

    const ratings = [
        { value: 5, fullStars: 5, halfStars: 0, emptyStars: 0 },
        { value: 4.5, fullStars: 4, halfStars: 1, emptyStars: 0 },
        { value: 4, fullStars: 4, halfStars: 0, emptyStars: 1 },
        { value: 3.5, fullStars: 3, halfStars: 1, emptyStars: 1 },
        { value: 3, fullStars: 3, halfStars: 0, emptyStars: 2 },
        { value: 2.5, fullStars: 2, halfStars: 1, emptyStars: 2 },
        { value: 2, fullStars: 2, halfStars: 0, emptyStars: 3 },
        { value: 1.5, fullStars: 1, halfStars: 1, emptyStars: 3 },
        { value: 1, fullStars: 1, halfStars: 0, emptyStars: 4 },
        { value: 0.5, fullStars: 0, halfStars: 1, emptyStars: 4 },
    ];

    return (
        <div className={style.rating}>
            <div className={style.rating__content}>
                <StarContent />
                <p>별점</p>
            </div>
            {ratings.map((rating, index) => (
                <div className={style[`rating__starBtns-group`]} key={index}>
                    <button
                        className={`${style.rating__starBtn} ${selectedRating == rating.value ? style.active : ''}`}
                        onClick={() => handleRatingChange(rating.value)}
                    >
                        <div className={style[`rating__starBtn__elements-group`]}>
                            <div className={style.rating__starBtn__stars}>
                                {renderStars(rating.fullStars, rating.halfStars, rating.emptyStars)}
                            </div>
                            <span className={style.rating__starBtn__text}>{rating.value}</span>
                        </div>
                    </button>
                </div>
            ))}
        </div>
    );
}
