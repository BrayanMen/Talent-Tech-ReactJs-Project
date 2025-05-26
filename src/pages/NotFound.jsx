import React, { useEffect } from 'react';
import './NotFound.css';
import { Link, useLocation } from 'react-router-dom';

export default function NotFound() {
    const location = useLocation();
    useEffect(() => {
        console.error(
            '404 Error: El usuario intentó acceder a una ruta inexistente: ',
            location.pathname
        );
    }, [location.pathname]);
    return (
        <div className='not-found_container'>
            <div className='not-found_content'>
                <h1 className='not-found_title'>404</h1>
                <div className='glitch_container'>
                    <div className='glitch' data-text="Page no Found">Page Not Found</div>
                </div>
                <p className='not-found_msg'>
                    Es posible que la página que estás buscando haya sido eliminada, haya cambiado
                    de nombre o no esté disponible temporalmente.
                </p>
                <Link to="/" className='not-found_btn'>Volver al inicio</Link>
            </div>
        </div>
    );
}
