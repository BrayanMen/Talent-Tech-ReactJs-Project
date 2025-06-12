import React, { useState } from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import LoginModal from '../components/LoginModal';

export default function MainLayout({ children }) {
    const [isOpenModal, setIsOpenModal] = useState(false);
    return (
        <>
            <NavBar
                openLoginModal={() => {
                    setIsOpenModal(true);
                }}
            />
            {children}
            {isOpenModal && (
                <>
                    <LoginModal onClose={() => setIsOpenModal(false)} />
                </>
            )}
            <Footer />
        </>
    );
}
