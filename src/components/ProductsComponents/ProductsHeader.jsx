import React from 'react';
import { FilterIcon, Grid, List } from 'lucide-react';
import SearchItems from './SearchItems';
import './ProductsHeader.css';

export default function ProductsHeader({
    searchItems,
    setSearchItems,
    showFilters,
    toggleFilters,
    activeFilterCount,
    view,
    setView,
    productCount,
}) {
    return (
        <div className="products_header">
            <h1 className="products_header-title">Productos</h1>
            <div className="products_header-bar">
                <SearchItems searchItems={searchItems} setSearchItems={setSearchItems} />

                <div className="products_header-filters">
                    <button
                        onClick={toggleFilters}
                        className={`filter_btn ${
                            showFilters || activeFilterCount > 0 ? 'active' : ''
                        }`}
                    >
                        <FilterIcon />
                        <span>Filtros</span>
                        {activeFilterCount > 0 && (
                            <span className="filter_count">{activeFilterCount}</span>
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
                    <div className="products_header-view-count">{productCount} Productos</div>
                </div>
            </div>
        </div>
    );
}
