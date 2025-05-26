import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { CircleUser, ShoppingBasket } from 'lucide-react';

const NavBar = () => {
    const { user, isAuth, logout } = useAuth();
    const { itemCount, toggleCart } = useCart();
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const [hoveredItem, setHoveredItem] = useState(null);
    const location = useLocation();

    const navBarItems = [
        {
            name: 'Inicio',
            link: '/',
            image: 'https://techwearstorm.com/cdn/shop/files/skull-bracelet-glove-one-size-techwear-storm-501.jpg?v=1719365553',
        },
        {
            name: 'Productos',
            link: '/products',
            image: 'https://techwearstorm.com/cdn/shop/files/techwear-cape-sakaide-s-storm-803.webp?v=1724751901',
        },
        // {
        //     name: 'Servicios',
        //     link: '/services',
        //     image: 'https://images.unsplash.com/photo-1596120236172-231808e800d1?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGVjaCUyMHNlcnZpY2VzfGVufDB8fDB8fHww',
        // },
        {
            name: 'Contacto',
            link: '/contact',
            image: 'https://img.freepik.com/free-vector/contact-us-concept-illustration_114360-2299.jpg',
        },
    ];

    useEffect(() => {
        setIsOpenMenu(false);
    }, [location.pathname]);

    const handleToggleMenu = () => {
        setIsOpenMenu(!isOpenMenu);
    };

    return (
        <header className="header_section">
            <div className="logo_container">
                <h1 className={`logo_text logo_header ${isOpenMenu ? '' : 'open'}`}>
                    Amón <span>Luxary</span>
                </h1>
            </div>
            <div className="header_btns">
                <i>
                <CircleUser size={30}/>
                </i>
                <i>
                <ShoppingBasket size={32}/>
                </i>
            </div>
            <input
                type="checkbox"
                id="menu_toggle"
                className="menu_toggle"
                checked={isOpenMenu}
                onChange={handleToggleMenu}
            />
            <label htmlFor="menu_toggle" className="navbar_toggle--label">
                <span></span>
                <span></span>
                <span></span>
            </label>

            <div className={`navbar_container ${isOpenMenu ? 'open' : ''}`}>
                <nav className="header_nav">
                    <div className="nav_content">
                        <ul className="header_nav-ul">
                            {navBarItems.map((item, i) => (
                                <li key={i} className="header_nav-li">
                                    <Link
                                        to={item.link}
                                        className="header_nav-link"
                                        onMouseEnter={() => setHoveredItem(i)}
                                        onMouseLeave={() => setHoveredItem(null)}
                                    >
                                        <p>{item.name}</p>
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <div className="hover_image-container">
                            {hoveredItem !== null ? (
                                <img
                                    src={navBarItems[hoveredItem].image}
                                    alt={navBarItems[hoveredItem].name}
                                    className="hover-image"
                                />
                            ) : (
                                <div className="logo_container">
                                    <h2 className="logo_text">
                                        Amon <span>Luxary</span>
                                    </h2>
                                </div>
                            )}
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default NavBar;
