import Modal from "react-modal";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import MyPageForm from "./ChangingInformation";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "../css/LoginForm.module.css";

export default function LoginPage() {
  const [loginPageOpen, setLoginPageOpen] = useState(false);
  const [signUpPageOpen, setSignUpPageOpen] = useState(false);
  const [myPageOpen, setMyPageOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [confirmLogoutOpen, setConfirmLogoutOpen] = useState(false); // 추가: 로그아웃 확인 모달 상태
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (userId) {
      setIsLoggedIn(true);
    }
  }, []);

  const openLoginModal = () => {
    setLoginPageOpen(true);
    setSignUpPageOpen(false);
    setMyPageOpen(false);
    document.body.classList.add("modal-open");
  };

  const openSignUpModal = () => {
    setLoginPageOpen(false);
    setSignUpPageOpen(true);
    setMyPageOpen(false);
    document.body.classList.add("modal-open");
  };

  const openMyPageModal = () => {
    setLoginPageOpen(false);
    setSignUpPageOpen(false);
    setMyPageOpen(true);
    document.body.classList.add("modal-open");
  };

  const openConfirmLogoutModal = () => {
    setConfirmLogoutOpen(true); // 추가: 로그아웃 확인 모달 열기
  };

  const closeModal = () => {
    setLoginPageOpen(false);
    setSignUpPageOpen(false);
    setMyPageOpen(false);
    setConfirmLogoutOpen(false); // 추가: 모달 닫기
    document.body.classList.remove("modal-open");
  };

  const onLogout = () => {
    localStorage.removeItem("user_id");
    setIsLoggedIn(false);
    navigate("/");
    closeModal(); // 추가: 로그아웃 후 모달 닫기
  };

  useEffect(() => {
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, []);

  return (
    <>
      {!isLoggedIn ? (
        <>
          <button
            type="button"
            onClick={openLoginModal}
            className={style.button}
          >
            로그인
          </button>
          <button
            type="button"
            onClick={openSignUpModal}
            className={style.button}
          >
            회원가입
          </button>
        </>
      ) : (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <button
            type="button"
            onClick={openMyPageModal}
            className={style.button}
          >
            정보 수정
          </button>
          <button type="button" onClick={openConfirmLogoutModal} className={style.button}> {/* 변경: 로그아웃 클릭 시 확인 모달 열기 */}
            로그아웃
          </button>
        </div>
      )}
      <Modal
        isOpen={loginPageOpen}
        onRequestClose={closeModal}
        className={style.content}
        style={{
          overlay: { backgroundColor: "rgba(33, 33, 33, 0.75)", zIndex: 1500 },
          content: { zIndex: 1500 },
        }}
      >
        <LoginForm openSignUpModal={openSignUpModal} />
      </Modal>
      <Modal
        isOpen={signUpPageOpen}
        onRequestClose={closeModal}
        className={style.signUp}
        style={{
          overlay: { backgroundColor: "rgba(33, 33, 33, 0.75)", zIndex: 1500 },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            maxHeight: "90vh",
            overflowY: "auto",
            zIndex: 1500,
          },
        }}
      >
        <SignUpForm openLoginModal={openLoginModal} />
      </Modal>
      <Modal
        isOpen={myPageOpen}
        onRequestClose={closeModal}
        className={style.myPage}
        style={{
          overlay: { backgroundColor: "rgba(33, 33, 33, 0.75)", zIndex: 1500 },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            maxHeight: "90vh",
            overflowY: "auto",
            zIndex: 1500,
          },
        }}
      >
        <MyPageForm />
      </Modal>
      <Modal
        isOpen={confirmLogoutOpen} // 변경: 로그아웃 확인 모달 열림 여부
        onRequestClose={closeModal}
        className={style.confirmLogout} // 스타일링을 위한 클래스
        style={{
          overlay: { backgroundColor: "rgba(33, 33, 33, 0.75)", zIndex: 1501 }, // 다른 모달보다 한 단계 위
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1501,
          },
        }}
      >
        <div>
          <p>로그아웃 하시겠습니까?</p>
          <button onClick={onLogout}>로그아웃</button>
          <button onClick={closeModal}>취소</button>
        </div>
      </Modal>
    </>
  );
}
