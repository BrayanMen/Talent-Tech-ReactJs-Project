import React, { useCallback, useState } from 'react';
import { useProduct } from '../context/ProductContext';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import  {useProductFilter}  from '../hooks/useProductFilter';
import './Products.css';
import Spinner from '../components/ui/Spinner';
import CardProduct from '../components/CardProduct';
import ProductHeader from '../components/ProductsHeader';
import ProductFilters from '../components/ProductFilters';
import ProductListItem from '../components/ProductListItem';

export default function Products() {
    const { products, loading, moreItems, loadingMoreProducts } = useProduct();
    const [showFilters, setShowFilters] = useState(false);
    const [view, setView] = useState('grid');

    const {
        filter,
        searchItems,
        setSearchItems,
        filteredProducts,
        categories,
        allTags,
        maxPrice,
        activeFilterCount,
        handleCategoryChange,
        handleTagChange,
        handleAvailabilityChange,
        handlePriceChange,
        clearFilters,
    } = useProductFilter(products);

    const { lastElementRef } = useInfiniteScroll(loadingMoreProducts, moreItems, loading);

    const toggleFilters = useCallback(() => setShowFilters(prev => !prev), []);

    return (
        <div className="products_page">
            <div className="products_container">
                <ProductHeader
                    searchItems={searchItems}
                    setSearchItems={setSearchItems}
                    showFilters={showFilters}
                    toggleFilters={toggleFilters}
                    activeFilterCount={activeFilterCount}
                    view={view}
                    setView={setView}
                    productCount={filteredProducts.length}
                />

                <div className="product_filter-sidebar">
                    <ProductFilters
                        showFilters={showFilters}
                        filter={filter}
                        categories={categories}
                        allTags={allTags}
                        maxPrice={maxPrice}
                        handleCategoryChange={handleCategoryChange}
                        handleTagChange={handleTagChange}
                        handleAvailabilityChange={handleAvailabilityChange}
                        handlePriceChange={handlePriceChange}
                        clearFilters={clearFilters}
                    />
                </div>

                {loading && filteredProducts.length === 0 ? (
                    <Spinner />
                ) : filteredProducts.length === 0 ? (
                    <div className="no-products">
                        <p className="no-products-title">No se encuentran los productos.</p>
                        <p className="no-products-subtitle">
                            Intente ajustar sus filtros o búsquedas.
                        </p>
                        <button onClick={clearFilters} className="clear_filter-btn">
                            Limpiar Filtros
                        </button>
                    </div>
                ) : (
                    <div
                        className={`products-grid ${showFilters ? 'filter_panel' : ''} ${
                            view === 'list' ? 'list-view' : ''
                        }`}
                    >
                        {filteredProducts.map((product, i) => (
                            <div
                                key={product.id}
                                className="products_item"
                                ref={i === filteredProducts.length - 1 ? lastElementRef : null}
                            >
                                {view === 'list' ? (
                                    <ProductListItem product={product} showFilters={showFilters} />
                                ) : (
                                    <CardProduct product={product} />
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {loading && filteredProducts.length > 0 && <Spinner />}
                
                {!loading && !moreItems && filteredProducts.length > 0 && (
                    <div className="end_msg">Llegaste al final de nuestros productos</div>
                )}
            </div>
        </div>
    );
}