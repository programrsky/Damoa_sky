import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from '../css/Navbar.module.css'; // CSS Modules 파일을 임포트
import { ReactComponent as Logo } from '../svg/Logo.svg'; // SVG를 컴포넌트로 임포트
import { NotificationIcon, SearchIcon } from '../svg/MenuIcons';
import LoginPage from './LoginPage';

export default function Navbar() {
    const [activeItem, setActiveItem] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const location = useLocation();
    useEffect(() => {
        // Check if user_id is present in local storage
        const userId = localStorage.getItem('user_id');
        console.log("Checking local storage for user_id:", userId);
        setIsLoggedIn(!!userId);
    }, []);

    useEffect(() => {
        // 경로가 바뀔 때마다 activeItem 상태를 업데이트합니다.
        const currentPath = location.pathname;
        if (currentPath === '/') {
            setActiveItem('main');
        } else if (currentPath.includes('/review')) {
            setActiveItem('review');
        } else if (currentPath.includes('/notice')) {
            setActiveItem('notice');
        } else if (currentPath.includes('/upcoming')) {
            setActiveItem('upcoming');
        }
    }, [location]);
    
    const handleLogout = () => {
        localStorage.removeItem('user_id');
        setIsLoggedIn(false);
    };

    return (
        <div className={styles.container}>
            <div className={styles.logoContainer}>
                <Link to="/">
                    <Logo className={styles.logoSVG} />
                    <p className={styles.logoText}>다모아</p>
                </Link>
            </div>
            <div className={styles.noticeContainer}>
                <Link
                    to="/notice"
                    className={`${styles.noticeItem} ${activeItem === 'notice' ? styles.active : ''}`}
                    onClick={() => setActiveItem('notice')}
                >
                    <p className={styles.noticeItemText}>공지사항</p>
                </Link>
                <Link
                    to="/"
                    className={`${styles.noticeItem} ${activeItem === 'main' ? styles.active : ''}`}
                    onClick={() => setActiveItem('main')}
                >
                    <p className={styles.noticeItemText}>메인 화면</p>
                </Link>
                <Link
                    to="/review"
                    className={`${styles.noticeItem} ${activeItem === 'review' ? styles.active : ''}`}
                    onClick={() => setActiveItem('review')}
                >
                    <p className={styles.noticeItemText}>리뷰</p>
                </Link>
                <Link
                    to="/upcoming"
                    className={`${styles.noticeItem} ${activeItem === 'upcoming' ? styles.active : ''}`}
                    onClick={() => setActiveItem('upcoming')}
                >
                    <p className={styles.noticeItemText}>기대되는 개봉작</p>
                </Link>
            </div>
            {/* Navbar Icons */}
            <div className={styles.menuContainer}>
                {isLoggedIn ? (
                    <UserIcon onLogout={handleLogout} />
                ) : (
                    <LoginPage onLoginSuccess={() => setIsLoggedIn(true)} />
                )}
                <SearchIcon />
                <NotificationIcon />
            </div>
        </div>
    );
}

function UserIcon({ onLogout }) {
    return (
        <div onClick={onLogout} style={{ cursor: 'pointer' }}>
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 100 100">
                <circle cx="50" cy="30" r="20" fill="#FFF"/>
                <path d="M50,58c-22.09,0-40,17.91-40,40h80C90,75.91,72.09,58,50,58z" fill="#FFF"/>
            </svg>
        </div>
    );
}
