import React, { useState } from 'react';
import NavBar from './NavBar';
import Footer from './Footer';

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
              {/* <AuthModal onClose={() => setShowAuthModal(false)} /> */}
                </>
            )}
            <Footer />
        </>
    );
}
