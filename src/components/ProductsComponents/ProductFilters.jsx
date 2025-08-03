import { DollarSign } from 'lucide-react';
import React from 'react';
import './ProductFilters.css'; 

function ProductFilters({
    showFilters,
    filter,
    categories,
    allTags,
    maxPrice,
    handleCategoryChange,
    handleTagChange,
    handleAvailabilityChange,
    handlePriceChange,
    clearFilters,
}) {
    if (!showFilters) return null;
    return (
        <div className="product_filter-panel">
            <div className="product_filter-panel-header">
                <h3 className="product_filter-panel-title">Filtros:</h3>
                <button onClick={clearFilters} className="clear_filter-btn">
                    Limpiar filtros
                </button>
            </div>
            <div className="product_filter-section">
                {/* Categorías */}
                <div className="product_filter-category">
                    <h4 className="product_filter-title">Categorías</h4>
                    <ul className="product_filter-category-list">
                        {categories.map((category, i) => (
                            <li key={i}>
                                <label
                                    className={`product_filter-category-item ${
                                        filter.category.includes(category) ? 'active' : ''
                                    }`}
                                >
                                    <input
                                        type="checkbox"
                                        checked={filter.category.includes(category)}
                                        onChange={() => handleCategoryChange(category)}
                                    />
                                    {category}
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Disponibilidad */}
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

                {/* Etiquetas */}
                <div className="product_filter-tags-section">
                    <h4 className="product_filter-title">Etiquetas</h4>
                    <div className="product_filter-tags">
                        {allTags.slice(0, 10).map(tag => (
                            <button
                                key={tag}
                                aria-label={`Filtrar por etiqueta ${tag}`}
                                className={`product_filter-tag-btn ${
                                    filter.tags.includes(tag) ? 'active' : ''
                                }`}
                                onClick={() => handleTagChange(tag)}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Rango de Precio */}
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
    );
}

export default ProductFilters;
