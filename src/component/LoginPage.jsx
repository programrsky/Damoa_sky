import Modal from 'react-modal';
import LoginForm from './LoginForm';
import { useState } from 'react';
import style from '../css/LoginForm.module.css';

export default function LoginPage() {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleLoginSuccess = () => {
        setModalIsOpen(false); // 로그인이 성공하면 Modal을 닫음
    };

    return (
        <>
            <button type="button" onClick={openModal}>
                로그인
            </button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className={style.content}
                style={{
                    overlay: { backgroundColor: 'rgba(33, 33, 33, 0.75)' },
                }}
            >
                <LoginForm onLoginSuccess={handleLoginSuccess} />
            </Modal>
        </>
    );
}