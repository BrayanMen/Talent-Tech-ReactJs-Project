import React from 'react';

export default function Footer() {
    return (
        <div>
            <footer className="footer_container">
                <div
                    className="footer_mask"/>
                <div className="footer_content">
                    <div className='footer_container-div'>
                        <div>
                            <h3 className='footer_h3'>
                                Amon Luxary
                            </h3>
                            <p className='footer_p'>
                                La oscuridad encarnada en tu ropa.
                            </p>
                        </div>
                        <div>
                            <p style={{ color: 'var(--gray-text)', fontSize: '0.9rem' }}>
                                © {new Date().getFullYear()}{' '}
                                <span style={{ color: 'var(--gold)' }}>Amon Luxary</span>. All
                                rights reserved.
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
