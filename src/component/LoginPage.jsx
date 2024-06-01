import Modal from 'react-modal';
import LoginForm from './LoginForm';
import { useState, useEffect } from 'react';
import style from '../css/LoginForm.module.css';
import SignUpForm from './SignUpForm';

export default function LoginPage() {
    const [loginPageOpen, setLoginPageOpen] = useState(false);
    const [signUpPageOpen, setSignUpPageOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const userId = localStorage.getItem('user_id');
        if (userId) {
            setIsLoggedIn(true);
        }
    }, []);

    const openLoginModal = () => {
        setLoginPageOpen(true);
        setSignUpPageOpen(false);
    };

    const openSignUpModal = () => {
        setLoginPageOpen(false);
        setSignUpPageOpen(true);
    };

    const closeModal = () => {
        setLoginPageOpen(false);
        setSignUpPageOpen(false);
    };

    const onLogout = () => {
        localStorage.removeItem('user_id');
        setIsLoggedIn(false);
    };

    return (
        <>
            {!isLoggedIn ? (
                <>
                    <button type="button" onClick={openLoginModal} className={style.button}>
                        로그인
                    </button>
                    <button type="button" onClick={openSignUpModal} className={style.button}>
                        회원가입
                    </button>
                </>
            ) : (
                <div onClick={onLogout} style={{ cursor: 'pointer' }}>
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 100 100">
                        <circle cx="50" cy="30" r="20" fill="#FFF" />
                        <path d="M50,58c-22.09,0-40,17.91-40,40h80C90,75.91,72.09,58,50,58z" fill="#FFF" />
                    </svg>
                </div>
            )}
            <Modal
                isOpen={loginPageOpen}
                onRequestClose={closeModal}
                className={style.content}
                style={{
                    overlay: { backgroundColor: 'rgba(33, 33, 33, 0.75)' },
                }}
            >
                <LoginForm openSignUpModal={openSignUpModal} />
            </Modal>
            <Modal
                isOpen={signUpPageOpen}
                onRequestClose={closeModal}
                className={style.signUp}
                style={{
                    overlay: { backgroundColor: 'rgba(33, 33, 33, 0.75)' },
                    content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)',
                        maxHeight: '90vh', // 최대 높이 설정
                        overflowY: 'auto', // 내용이 넘칠 경우 스크롤
                    },
                }}
            >
                <SignUpForm openLoginModal={openLoginModal} />
            </Modal>
        </>
    );
}
