import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useProduct } from '../context/ProductContext';
import { useLocation } from 'react-router-dom';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import './Products.css';
import { DollarSign, FilterIcon, Grid, List, SearchIcon, X } from 'lucide-react';
import Spinner from '../components/ui/Spinner';
import CardProduct from '../components/CardProduct';

export default function Products() {
    const { products, loading, moreItems, loadingMoreProducts, displayProducts } = useProduct();
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
        if (!products || products.length === 0) return;

        let result = [...products];

        if (searchItems) {
            const lower = searchItems.toLowerCase();
            result = result.filter(p => {
                p.name.toLowerCase().includes(lower) ||
                    p.description.toLowerCase().includes(lower) ||
                    (p.tags && p.tags.some(tag => tag.toLowerCase().includes(lower)));
            });
        }

        if (filter.category.length > 0) {
            result = result.filter(p => {
                filter.category.includes(p.category);
            });
        }

        result = result.filter(p => p.price >= filter.price[0] && p.price <= filter.price[1]);

        if (filter.availability !== null) {
            result = result.filter(p => (p.stock > 0 && p.avaible) === filter.availability);
        }

        if (filter.tags.length > 0) {
            result = result.filter(p => p.tags && filter.tags.some(t => p.tags.includes(t)));
        }

        setFilterProdu(result);
    }, [products, filter, searchItems]);

    const handleCategoryChange = useCallback(category => {
        setFilter(prev => ({
            ...prev,
            category: prev.category.includes(category)
                ? prev.category.filter(c => c !== category)
                : [...prev.category, category],
        }));
    }, []);

    const handleTagChange = useCallback(tag => {
        setFilter(prev => ({
            ...prev,
            tags: prev.tags.includes(tag)
                ?  prev.tags.filter(t => t !== tag)
                : [...prev.tags, tag],
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
                                <div className="product_filter-category">
                                    <h4 className="product_filter-title">Categorias</h4>
                                    <ul className="product_filter-category-list">
                                        {categories.map((category, i) => (
                                            <li key={i}>
                                                <label className="product_filter-category-item">
                                                    <input
                                                        type="checkbox"
                                                        className="product_filter-category-checkbox"
                                                        checked={filter.category.includes(category)}
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

                                <div>
                                    <h4>Etiquetas</h4>
                                    <div className="product_filter-tags">
                                        {allTags.slice(0, 10).map(t => (
                                            <button
                                                key={t}
                                                aria-label={`Filtrar por etiqueta ${t}`}
                                                className={`product_filter-tag-btn ${
                                                    filter.tags.includes(t) ? 'active' : ''
                                                } `}
                                                onChange={() => handleTagChange(t)}
                                            >
                                                {t}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h4>Disponibilidad</h4>
                                    <div className="product_filter-availability">
                                        <label className="product_filter-availability-item">
                                            <input
                                                type="checkbox"
                                                className="product_filter-availability-checkbox"
                                                checked={filter.availability === true}
                                                onChange={() => handleAvailabilityChange(true)}
                                            />
                                            En stock
                                        </label>
                                        <label className="product_filter-availability-item">
                                            <input
                                                type="checkbox"
                                                className="product_filter-availability-checkbox"
                                                checked={filter.availability === false}
                                                onChange={() => handleAvailabilityChange(false)}
                                            />
                                            Agotado
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <h4>Rango de Precio</h4>
                                    <div className="product_filter-price">
                                        <div>
                                            <span>
                                                <DollarSign />
                                                {filter.price[0]}
                                            </span>
                                            <span>
                                                <DollarSign />
                                                {filter.price[1]}
                                            </span>
                                        </div>
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
                                <div>
                                    <h4>Resultados</h4>
                                    <p className="product_filter-results">
                                        {filterProdu.length} productos encontrados
                                    </p>
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
                        <button onClick={{ clearFilters }} className="btn btn-secondary">
                            Limpiar Filtros
                        </button>
                    </div>
                ) : (
                    <div
                        className={`products-grid ${showFilters ? 'filter_panel' : ''} ${
                            view === 'list' ? 'list-view' : ''
                        }`}
                    >
                        {filterProdu.map((product, i) => (
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
                                            <h2>{product.name}</h2>
                                        </div>
                                    </div>
                                ) : (
                                    <CardProduct product={product} />
                                )}
                            </div>
                        ))}
                    </div>
                )}
                {loading && filterProdu.length > 0 && <Spinner />}
                {!loading && !moreItems && filterProdu.length > 0 && (
                    <div className="end_msg">Llegaste al final de nuestros productos</div>
                )}
            </div>
        </div>
    );
}
