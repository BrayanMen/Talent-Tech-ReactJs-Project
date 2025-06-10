import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const useProductFilter = products => {
    const location = useLocation();
    const [filter, setFilter] = useState({
        category: [],
        price: [],
        availability: null,
        tags: [],
    });

    const [searchItems, setSearchItems] = useState('');

    const [showFilters, setShowFilters] = useState(false);
    const [view, setView] = useState('grid');

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

    const filteredProducts = useMemo(() => {
        if (!products || products.length === 0) return [];
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
        return result;
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

    return {
        filteredProducts,
        categories,
        allTags,
        maxPrice,
        filter,
        searchItems,
        setSearchItems,
        showFilters,
        setShowFilters,
        view,
        setView,
        handleCategoryChange,
        handleTagChange,
        handleAvailabilityChange,
        handlePriceChange,
        clearFilters,
        activateFilterCount,
    };
};
