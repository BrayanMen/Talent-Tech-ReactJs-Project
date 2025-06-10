import React from 'react'
import {SearchIcon, X } from 'lucide-react';
import './SearchItems.css'; // Assuming you have a CSS file for styles


export default function SearchItems({ searchItems, setSearchItems }) {
  return (
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
    );
}
