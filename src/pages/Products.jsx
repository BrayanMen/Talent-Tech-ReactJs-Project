import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useProduct } from '../context/ProductContext';
import { useLocation } from 'react-router-dom';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import './Products.css';
import { FilterIcon, Grid, List, SearchIcon, X } from 'lucide-react';
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

    console.log(displayProducts);

    const categories = useMemo(() => [...new Set(products.map(p => p.category))], [products]);
    const tags = useMemo(() => [...new Set(products.flatMap(p => p.tags || []))], [products]);
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
        if (!displayProducts || displayProducts.length === 0) return;

        let result = [...displayProducts];

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
    }, [displayProducts, filter, searchItems]);

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
                    {showFilters && (
                        <div className="product_sidebar-panel">
                            <div className="product_sidebar-panel-header">
                                <h3>Filtrados: </h3>
                                <button>Limpiar filtros</button>
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
                    <div className={`products-grid  ${view === 'list' ? 'list-view' : ''}`}>
                        {filterProdu.map((product, i) => (
                            <div
                                key={product.id}
                                className="products_item"
                                ref={i === filterProdu.length - 1 ? null : lastElementRef}
                            >
                                {view === 'list' ? (
                                    <div className="products_card-list">
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
