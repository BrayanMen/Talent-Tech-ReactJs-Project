import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { Link } from 'react-router-dom';

const NavBar = () => {
    // const { user, isAuth, logout } = useAuth();
    const [isOpenMenu, setIsOpenMenu] = useState(false);

    const navBarItems = [
        {
            name: 'Inicio',
            link: '/',
        },
        {
            name: 'Productos',
            link: '/products',
        },
    ];
    return (
        <header className="header_section">
            
            <input type="checkbox" id="menu_toggle" className="menu_toggle" />
            <label htmlFor="menu_toggle" className="navbar_toggle--label">
                <span></span>
                <span></span>
            </label>
            <nav class="header_nav">
                <ul class="header_nav-ul">
                    {navBarItems.map((item, i) => (
                        <Link to={item.link} key={i} className='header_nav-link'>
                            <li class="header_nav-li">
                                <p>{item.name}</p>
                            </li>
                        </Link>
                    ))}
                </ul>
            </nav>
           
        </header>
    );
};

export default NavBar;
