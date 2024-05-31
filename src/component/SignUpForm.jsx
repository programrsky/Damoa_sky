import style from '../css/LoginForm.module.css';
import { useState } from 'react';
import axios from "axios";

export default function SignUpForm() {
    const [user_id, setUserId] = useState("");
    const [user_pw, setUserPw] = useState("");
    const [confirmPw, setConfirmPw] = useState("");
    const [user_name, setName] = useState("");
    const [user_date, setBirth] = useState("");
    const [user_num, setPhoneNumber] = useState("");
    const [user_email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleSignUp = async () => {
        if (user_pw !== confirmPw) {
            setErrorMessage("비밀번호가 일치하지 않습니다.");
            return;
        }

        try {
            // Define the base URL
            let baseURL = "";
            if (process.env.NODE_ENV === "development") {
                // If in development environment, use local IP
                baseURL = "http://121.139.20.242:5100";
            }
            const response = await axios.post(`${baseURL}/api/register`, {
                user_id,
                user_pw,
                user_name,
                user_date,
                user_num,
                user_email,
            });
            if (response.data.success) {
                setSuccessMessage("회원가입이 완료되었습니다.");
                window.location.reload();
            } else {
                setErrorMessage("회원가입에 실패했습니다. 다시 시도해주세요.");
            }
        } catch (error) {
            setErrorMessage("데이터베이스 연결이 실패하였습니다.");
        }
    };

    return (
        <div className={style.bg}>
            <div className={style.bg__container}>
                <p className={style.login__title}>회원가입을 해주세요</p>
                <div className={style.login__input}>
                    {/* 아이디 */}
                    <div className={style.login__input__id}>
                        <p>아이디를 입력해주세요</p>
                        <input
                            type="text"
                            name="id"
                            value={user_id}
                            onChange={(e) => setUserId(e.target.value)}
                        />
                    </div>
                    {/* 비밀번호 */}
                    <div className={style.login__input__pw}>
                        <div>
                            <p>비밀번호를 입력해주세요.</p>
                        </div>
                        <div className={style.pwInputGroup}>
                            <input
                                type="password"
                                name="password"
                                value={user_pw}
                                onChange={(e) => setUserPw(e.target.value)}
                            />
                        </div>
                    </div>
                    {/* 비밀번호 검증 (다시 입력) */}
                    <div className={style.login__input__pw}>
                        <div>
                            <p>비밀번호를 다시 입력해주세요.</p>
                        </div>
                        <div className={style.pwInputGroup}>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={confirmPw}
                                onChange={(e) => setConfirmPw(e.target.value)}
                            />
                        </div>
                    </div>
                    {/* 이름 */}
                    <div className={style.login__input__name}>
                        <p>이름을 입력해주세요.</p>
                        <input
                            type="text"
                            name="name"
                            value={user_name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    {/* 생년월일 */}
                    <div className={style.login__input__birth}>
                        <p>생년월일을 입력해주세요.</p>
                        <input
                            type="date"
                            name="birth"
                            value={user_date}
                            onChange={(e) => setBirth(e.target.value)}
                        />
                    </div>
                    {/* 전화번호 */}
                    <div className={style.login__input__phoneNumber}>
                        <p>전화번호를 입력해주세요.</p>
                        <input
                            type="tel"
                            name="phoneNumber"
                            value={user_num}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </div>
                    {/* 이메일 */}
                    <div className={style.login__input__email}>
                        <p>이메일을 입력해주세요.</p>
                        <input
                            type="email"
                            name="email"
                            value={user_email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>
                {errorMessage && <p className={style.errorMessage}>{errorMessage}</p>}
                {successMessage && <p className={style.successMessage}>{successMessage}</p>}
                <button className={style.login__loginBtn} onClick={handleSignUp}>
                    <p>회원가입</p>
                    <Arrow />
                </button>
            </div>
            <div className={style.register}>
                <div className={style.register__container}>
                    <a className={style.register__title} href="#">
                        로그인 하러 가기
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