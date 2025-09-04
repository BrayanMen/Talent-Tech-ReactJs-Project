import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { CircleUser, PanelBottom, ShoppingBasket } from 'lucide-react';
import './Navbar.css';

const NavBar = ({ openLoginModal }) => {
    const { user, isAuth, logout } = useAuth();
    const { itemCount, toggleCart } = useCart();
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const [isOpenUserMenu, setIsOpenUserMenu] = useState(false);
    const [hoveredItem, setHoveredItem] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    const logoutUser = () => {
        logout();
        setIsOpenMenu(false);
        navigate('/');
    };

    const handleLoginClick = () => {
        isAuth ? logoutUser() : openLoginModal();
    };

    const handleCartClick = () => {
        !isAuth ? openLoginModal() : toggleCart();
    };

    const handleWishlistClick = () => {
        !isAuth ? openLoginModal() : navigate('/wishlist');
    };

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
                <h1 className={` logo_header ${isOpenMenu ? '' : 'open'}`}>
                    <Link to="/" className="logo_text">
                        Amón <span>Luxary</span>
                    </Link>
                </h1>
            </div>
            <div className="header_btns">
                {isAuth ? (
                    <div>
                        <button
                            onClick={() => setIsOpenUserMenu(!isOpenUserMenu)}
                            className="header-btn user-btn"
                            aria-label="Menu de usuario"
                            aria-expanded={isOpenUserMenu}
                            aria-haspopup="true"
                        >
                            <img src={user.avatar} alt={`${user.name} avatar`} className="avatar" />
                        </button>
                        {isOpenUserMenu && (
                            <div role="menu" className="user-menu">
                                <div className="user-info">
                                    <img
                                        src={user.avatar}
                                        alt={`${user.name} avatar`}
                                        className="avatar"
                                    />
                                    <div className="user-details">
                                        <p className="">{user.name}</p>
                                        <p className="">{user.email}</p>
                                    </div>
                                </div>
                                <div className="dropdown-divisor"></div>
                                <div className="dropdown-items">
                                    <Link
                                        to="/profile"
                                        className="dropdown-item"
                                        onClick={() => setIsOpenUserMenu(false)}
                                        role="menuitem"
                                    >
                                        👤 Perfil
                                    </Link>
                                    <button
                                        onClick={() => {
                                            setIsOpenUserMenu(false);
                                            handleWishlistClick();
                                        }}
                                        className="dropdown-item"
                                        role="menuitem"
                                    >
                                        ❤️ Favoritos
                                    </button>
                                    {user?.role === 'admin' && (
                                        <Link to="/admin" className="dropdown-item" role="menuitem">
                                            🗃️ Panel de Control
                                        </Link>
                                    )}
                                </div>
                                <div className="dropdown-divisor"></div>
                                <button
                                    onClick={() => {
                                        setIsOpenUserMenu(false);
                                        logoutUser();
                                    }}
                                    className="dropdown-item"
                                    role="menuitem"
                                >
                                    🚪 Cerrar Sesion
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        <button
                            className="header-btn"
                            onClick={handleLoginClick}
                            aria-label="Iniciar sesión"
                        >
                            <i>
                                <CircleUser size={30} />
                            </i>
                        </button>
                    </>
                )}
                <button
                    className="header-btn"
                    onClick={handleCartClick}
                    aria-label={`Carrito de compras con ${itemCount} items`}
                >
                    {itemCount > 0 && (
                        <span
                            className="cart-count"
                            aria-label={`${itemCount} items en el carrito`}
                        >
                            {itemCount}
                        </span>
                    )}
                    <i>
                        <ShoppingBasket size={32} />
                    </i>
                </button>
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
                            {isAuth && (
                                <Link to="/wishlist" className="header_nav-li header_nav-link">
                                    Favoritos
                                </Link>
                            )}
                            {user?.role === 'admin' && (
                                <Link to="/admin" className=" header_nav-li header_nav-link">
                                    Admin
                                </Link>
                            )}
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
