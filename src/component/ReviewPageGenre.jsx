import React from 'react';
import style from '../css/Language.module.css';
import GenreIcon from '../svg/GenreIcon';

export default function ReviewPageGenre() {
    const handleGenreClick = (genre) => {
        localStorage.setItem('selectedGenre', genre);
        if (localStorage.getItem('selectedGenre') === "전체") {
            localStorage.removeItem('selectedGenre');
            localStorage.removeItem('rating');
        }
        window.location.reload();
    };

    return (
        <div className={style.language}>
            <div className={style.language__content}>
                <GenreIcon />
                <p>장르</p>
            </div>
            <div className={style[`language__btn-group`]}>
                <button onClick={() => handleGenreClick('전체')}>전체</button>
                <button onClick={() => handleGenreClick('범죄')}>범죄</button>
                <button onClick={() => handleGenreClick('코미디')}>코미디</button>
                <button onClick={() => handleGenreClick('드라마')}>드라마</button>
                <button onClick={() => handleGenreClick('모험')}>모험</button>
                <button onClick={() => handleGenreClick('키즈')}>키즈</button>
                <button onClick={() => handleGenreClick('액션')}>액션</button>
                <button onClick={() => handleGenreClick('판타지')}>판타지</button>
                <button onClick={() => handleGenreClick('애니메이션')}>애니메이션</button>
                <button onClick={() => handleGenreClick('스릴러')}>스릴러</button>
            </div>
        </div>
    );
}
