import style from '../css/LoginForm.module.css';
import { useState } from 'react';
import axios from "axios";

export default function LoginForm({ onLoginSuccess }) {
    const [user_id, setUsername] = useState("");
    const [user_pw, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async () => {
        try {
            // Define the base URL
            let baseURL = "";
            if (process.env.NODE_ENV === "development") {
                // If in development environment, use local IP
                baseURL = "http://121.139.20.242:5100";
            }
            const response = await axios.post(`${baseURL}/api/check`, {
                user_id: user_id,
                user_pw: user_pw,
            });
            if (response.data.valid) {
                localStorage.setItem("user_id", user_id);
                window.location.reload();
            } else {
                setErrorMessage("아이디 또는 비밀번호가 잘못되었습니다.");
            }
        } catch (error) {
            setErrorMessage("데이터베이스 연결이 실패하였습니다.");
        }
    };

    return (
        <div className={style.bg}>
            <div className={style.bg__container}>
                <p className={style.login__title}>로그인을 해주세요</p>
                <div className={style.login__input}>
                    <div className={style.login__input__id}>
                        <p>아이디</p>
                        <input
                            type="text"
                            name="id"
                            value={user_id}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className={style.login__input__pw}>
                        <div>
                            <p>비밀번호</p>
                            <a href="#">비밀번호를 잊어버렸나요?</a>
                        </div>
                        <div className={style.pwInputGroup}>
                            <input
                                type="password"
                                name="password"
                                value={user_pw}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <EyeSvg />
                        </div>
                    </div>
                </div>
                {errorMessage && <p className={style.errorMessage}>{errorMessage}</p>}
                <button className={style.login__loginBtn} onClick={handleLogin}>
                    <p>로그인</p>
                    <Arrow />
                </button>
            </div>
            <div className={style.register}>
                <div className={style.register__container}>
                    <a className={style.register__title} href="#">
                        회원가입
                    </a>
                </div>
            </div>
        </div>
    );
}

function EyeSvg() {
    return (
        <svg
            className={style[`eye-icon`]}
            width="44"
            height="44"
            viewBox="0 0 49 49"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M40 15.5417C33.75 15.5417 31.25 22 31.25 22C31.25 22 33.75 28.4584 40 28.4584C46.25 28.4584 48.75 22 48.75 22C48.75 22 46.25 15.5417 40 15.5417Z"
                stroke="#999999"
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
            />
            <path
                d="M40 24.5C41.381 24.5 42.5 23.3807 42.5 22C42.5 20.6193 41.381 19.5 40 19.5C38.619 19.5 37.5 20.6193 37.5 22C37.5 23.3807 38.619 24.5 40 24.5Z"
                stroke="#999999"
                strokeWidth="1.5" 
                strokeLinecap="round"
                strokeLinejoin="round" 
            />
        </svg>
    );
}

function Arrow() {
    return (
        <svg
            width={21}
            height={20}
            viewBox="0 0 21 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
                flexGrow: 0,
                flexShrink: 0,
                width: 20,
                height: 20,
                position: 'relative',
            }}
            preserveAspectRatio="xMidYMid meet"
        >
            <path d="M3.625 10H17.375" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            <path
                d="M11.75 4.375L17.375 10L11.75 15.625"
                stroke="white"
                strokeWidth={2} 
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}