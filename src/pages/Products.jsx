import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useProduct } from '../context/ProductContext';
import { useLocation } from 'react-router-dom';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import './Products.css';
import { DollarSign, FilterIcon, Grid, HeartPlus, List, Plus, SearchIcon, X } from 'lucide-react';
import Spinner from '../components/ui/Spinner';
import CardProduct from '../components/CardProduct';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Products() {
    const { products, loading, moreItems, loadingMoreProducts, displayProducts } = useProduct();
    const { isAuth, user, handleWishlistProduct } = useAuth();
    const { addToCart } = useCart();
    const location = useLocation();
    const [filterProdu, setFilterProdu] = useState([]);
    const [filter, setFilter] = useState({
        category: [],
        price: [0, 1000],
        availability: null,
        tags: [],
    });
    const [searchItems, setSearchItems] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [view, setView] = useState('grid');

    const { lastElementRef } = useInfiniteScroll(loadingMoreProducts, moreItems, loading);

    const queryParams = useMemo(() => new URLSearchParams(location.search), [location.search]);

    const categories = useMemo(() => [...new Set(products.map(p => p.category))], [products]);
    const allTags = useMemo(() => [...new Set(products.flatMap(p => p.tags || []))], [products]);
    const maxPrice = useMemo(
        () => Math.ceil(Math.max(...products.map(p => p.price)) / 100) * 100,
        [products]
    );

    useEffect(() => {
        const category = queryParams.get('category');
        const search = queryParams.get('search');
        const tag = queryParams.get('tag');

        if (category) setFilter(prev => ({ ...prev, category: [category] }));
        if (tag) setFilter(prev => ({ ...prev, tags: [tag] }));
        if (search) setSearchItems(search);
    }, [queryParams]);

    useEffect(() => {
        setFilter(prev => ({ ...prev, price: [prev.price[0], maxPrice] }));
    }, [maxPrice]);

    useEffect(() => {
        if (!products || products.length === 0) {
            setFilterProdu([]);
            return;
        }

        let result = [...products];

        if (searchItems) {
            const lower = searchItems.toLowerCase();
            result = result.filter(
                p =>
                    p.name.toLowerCase().includes(lower) ||
                    p.description.toLowerCase().includes(lower) ||
                    (p.tags && p.tags.some(tag => tag.toLowerCase().includes(lower)))
            );
        }

        // Filtro por categoría
        if (filter.category.length > 0) {
            result = result.filter(p => filter.category.includes(p.category));
        }

        // Filtro por precio
        result = result.filter(p => p.price >= filter.price[0] && p.price <= filter.price[1]);

        // Filtro por disponibilidad
        if (filter.availability !== null) {
            result = result.filter(p => (p.stock > 0 && p.available) === filter.availability);
        }

        // Filtro por etiquetas
        if (filter.tags.length > 0) {
            result = result.filter(p => p.tags && filter.tags.some(t => p.tags.includes(t)));
        }
        setFilterProdu(result);
    }, [products, filter, searchItems]);

    const handleCategoryChange = useCallback(categoryItem => {
        setFilter(prev => ({
            ...prev,
            category: prev.category.includes(categoryItem)
                ? prev.category.filter(c => c !== categoryItem)
                : [...prev.category, categoryItem],
        }));
    }, []);

    const handleTagChange = useCallback(tag => {
        setFilter(prev => ({
            ...prev,
            tags: prev.tags.includes(tag) ? prev.tags.filter(t => t !== tag) : [...prev.tags, tag],
        }));
    }, []);

    const handleAvailabilityChange = useCallback(available => {
        setFilter(prev => ({
            ...prev,
            availability: prev.availability === available ? null : available,
        }));
    }, []);

    const handlePriceChange = useCallback((index, value) => {
        setFilter(prev => ({
            ...prev,
            price:
                index === 0 ? [parseInt(value), prev.price[1]] : [prev.price[0], parseInt(value)],
        }));
    }, []);

    const toggleFilters = useCallback(() => setShowFilters(prev => !prev), []);

    const clearFilters = useCallback(() => {
        setFilter({
            category: [],
            price: [0, maxPrice],
            availability: null,
            tags: [],
        });
        setSearchItems('');
    }, [maxPrice]);

    const activateFilterCount = useMemo(
        () =>
            [
                filter.category.length,
                filter.tags.length,
                filter.availability !== null ? 1 : 0,
                filter.price[0] > 0 || filter.price[1] < maxPrice ? 1 : 0,
                searchItems ? 1 : 0,
            ].reduce((acc, value) => acc + (value ? 1 : 0), 0),
        [filter, searchItems, maxPrice]
    );

    return (
        <div className="products_page">
            <div className="products_container">
                <div className="products_header">
                    <h1 className="products_header-title">Productos</h1>
                    <div className="products_header-bar">
                        <div className="products_header-bar-search">
                            <input
                                type="text"
                                placeholder="Buscar productos"
                                value={searchItems}
                                onChange={e => setSearchItems(e.target.value)}
                                className="products_header-bar-search-input"
                            />
                            <i className="products_header-icon">
                                <SearchIcon />
                            </i>
                            {searchItems && (
                                <button
                                    aria-label="Limpiar buscador"
                                    className="products_header-icon-clear"
                                    onClick={() => setSearchItems('')}
                                >
                                    <X />
                                </button>
                            )}
                        </div>

                        <div className="products_header-filters">
                            <button
                                onClick={toggleFilters}
                                className={`filter_btn ${
                                    showFilters || activateFilterCount > 0 ? 'active' : ''
                                }`}
                            >
                                <FilterIcon />
                                <span>Filtros</span>
                                {activateFilterCount > 0 && (
                                    <span className="filter_count">{activateFilterCount}</span>
                                )}
                            </button>
                            <div className="products_header-view">
                                <button
                                    onClick={() => setView('grid')}
                                    className={`products_header-view-btn ${
                                        view === 'grid' ? 'active' : ''
                                    }`}
                                    aria-label="Vista en Grid"
                                >
                                    <Grid />
                                </button>
                                <button
                                    onClick={() => setView('list')}
                                    className={`products_header-view-btn ${
                                        view === 'list' ? 'active' : ''
                                    }`}
                                    aria-label="Vista en Lista"
                                >
                                    <List />
                                </button>
                            </div>
                            <div className="products_header-view-count">
                                {filterProdu.length} Productos
                            </div>
                        </div>
                    </div>
                </div>

                <div className="product_filter-sidebar">
                    {showFilters && (
                        <div className="product_filter-panel">
                            <div className="product_filter-panel-header">
                                <h3 className="product_filter-panel-title">Filtrados: </h3>
                                <button onClick={clearFilters} className="clear_filter-btn">
                                    Limpiar filtros
                                </button>
                            </div>
                            <div className="product_filter-section">
                                <div>
                                    <div className="product_filter-category">
                                        <h4 className="product_filter-title">Categorias</h4>
                                        <ul className="product_filter-category-list">
                                            {categories.map((category, i) => (
                                                <li key={i}>
                                                    <label
                                                        className={`product_filter-category-item ${
                                                            filter.category.includes(category)
                                                                ? 'active'
                                                                : ''
                                                        }`}
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            className=""
                                                            checked={filter.category.includes(
                                                                category
                                                            )}
                                                            onChange={() =>
                                                                handleCategoryChange(category)
                                                            }
                                                        />
                                                        {category}
                                                    </label>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="product_filter-availability-section">
                                        <h4 className="product_filter-title">Disponibilidad</h4>
                                        <div className="product_filter-availability-items">
                                            <label
                                                className={`product_filter-availability-item ${
                                                    filter.availability === true ? 'active' : ''
                                                }`}
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={filter.availability === true}
                                                    onChange={() => handleAvailabilityChange(true)}
                                                />
                                                En stock
                                            </label>
                                            <label
                                                className={`product_filter-availability-item ${
                                                    filter.availability === false ? 'active' : ''
                                                }`}
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={filter.availability === false}
                                                    onChange={() => handleAvailabilityChange(false)}
                                                />
                                                Agotado
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="product_filter-tags-section">
                                    <h4 className="product_filter-title">Etiquetas</h4>
                                    <div className="product_filter-tags">
                                        {allTags.slice(0, 10).map(t => (
                                            <button
                                                key={t}
                                                aria-label={`Filtrar por etiqueta ${t}`}
                                                className={`product_filter-tag-btn ${
                                                    filter.tags.includes(t) ? 'active' : ''
                                                } `}
                                                onClick={() => handleTagChange(t)}
                                            >
                                                {t}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="product_filter-price-section">
                                    <h4 className="product_filter-title">Rango de Precio</h4>
                                    <div className="product_filter-price">
                                        <div className="product_filter-price-display">
                                            <span>
                                                <DollarSign />
                                                {filter.price[0]}
                                            </span>
                                            <span>
                                                <DollarSign />
                                                {filter.price[1]}
                                            </span>
                                        </div>
                                        <div className="product_filter-price-slider">
                                            <input
                                                type="range"
                                                min="0"
                                                max={maxPrice}
                                                step="1"
                                                className="product_filter-price-input min-price"
                                                value={filter.price[0]}
                                                onChange={e => handlePriceChange(0, e.target.value)}
                                            />
                                            <input
                                                type="range"
                                                min="0"
                                                max={maxPrice}
                                                className="product_filter-price-input max-price"
                                                value={filter.price[1]}
                                                onChange={e => handlePriceChange(1, e.target.value)}
                                            />
                                            <div className="product_filter-slider-track"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                {loading && filterProdu.length === 0 ? (
                    <>
                        <Spinner />
                    </>
                ) : filterProdu.length === 0 ? (
                    <div className="no-products">
                        <p className="no-products-title">No se encuentran los prooductos.</p>
                        <p className="no-products-subtitle">
                            Intente ajustar sus filtros o busquedas.
                        </p>
                        <button onClick={clearFilters} className="btn btn-secondary">
                            Limpiar Filtros
                        </button>
                    </div>
                ) : (
                    <div
                        className={`products-grid ${showFilters ? 'filter_panel' : ''} ${
                            view === 'list' ? 'list-view' : ''
                        }`}
                    >
                        {filterProdu.map((product, i) => {
                            const outStock = product.stock === 0 || !product.available;
                            const inWishList = isAuth && user?.wishlist?.includes(product.id);

                            const handleAddCart = e => {
                                e.preventDefault();
                                e.stopPropagation();
                                if (!outStock) addToCart(product);
                            };

                            const handleWishList = e => {
                                e.preventDefault();
                                e.stopPropagation();
                                if (isAuth) {
                                    handleWishlistProduct(product.id);
                                }
                            };
                            return (
                                <div
                                    key={product.id}
                                    className="products_item"
                                    ref={i === filterProdu.length - 1 ? lastElementRef : null}
                                >
                                    {view === 'list' ? (
                                        <div
                                            className={`products_card-list ${
                                                showFilters ? 'filter_panel' : ''
                                            }`}
                                        >
                                            <div>
                                                <img src={product.images[0]} alt={product.name} />
                                            </div>
                                            <div>
                                                <div>
                                                    <h2>{product.name}</h2>
                                                    <p>${product.price.toFixed(2)}</p>
                                                    <p className="product_description">
                                                        {product.description}
                                                    </p>
                                                    <div>
                                                        {product.tags &&
                                                            product.tags.map((tag, i) => (
                                                                <span
                                                                    key={i}
                                                                    className="product-tag"
                                                                >
                                                                    {tag}
                                                                </span>
                                                            ))}
                                                    </div>
                                                    <div className="product-card-actions">
                                                        <button
                                                            onClick={handleWishList}
                                                            className={`product_card-btn ${
                                                                inWishList ? 'active' : ''
                                                            }`}
                                                            aria-label={
                                                                inWishList
                                                                    ? 'Remover de favoritos'
                                                                    : 'Agregar a favoritos'
                                                            }
                                                            disabled={!isAuth}
                                                        >
                                                            <HeartPlus size={30} />
                                                        </button>
                                                        <button
                                                            onClick={handleAddCart}
                                                            className={`product_card-btn ${
                                                                outStock ? 'disabled' : ''
                                                            }`}
                                                            disabled={outStock}
                                                            aria-label={
                                                                outStock
                                                                    ? 'Agotado'
                                                                    : 'Agregar al carrito'
                                                            }
                                                        >
                                                            <Plus size={30} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <CardProduct product={product} />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
                {loading && filterProdu.length > 0 && <Spinner />}
                <br />
                {!loading && !moreItems && filterProdu.length > 0 && (
                    <div className="end_msg">Llegaste al final de nuestros productos</div>
                )}
            </div>
        </div>
    );
}
