import { Search } from 'lucide-react';
import './SearchBar.css';

const SearchBar = ({ value, onChange, placeholder = "Buscar productos..." }) => {
  return (
    <div className="search-container">
      <div className="search-wrapper">
        <label htmlFor="product-search" className="search-label">
          Buscar productos
        </label>
        <input
          id="product-search"
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="search-input"
          aria-describedby="search-help"
        />
        <Search 
          className="search-icon" 
          size={17} 
          aria-hidden="true" 
        />
        <div id="search-help" className="search-help">
          Buscar por nombre de producto, descripción o etiquetas
        </div>
      </div>
    </div>
  );
};

export default SearchBar;