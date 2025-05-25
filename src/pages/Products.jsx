import React, { useEffect, useState } from 'react';
import { useProduct } from '../context/ProductContext';
import { useLocation } from 'react-router-dom';
import useInfiniteScroll from '../hooks/useInfiniteScroll';

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
    const [tags, setTags] = useState([]);
    const [categories, setCategories] = useState([]);
    const [maxPrice, setMaxPrice] = useState(1000);
    const { lastElementRef } = useInfiniteScroll(loadingMoreProducts, moreItems, loading);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const category = params.get('category');
        const search = params.get('search');
        const tag = params.get('tag');

        if (category) {
            setFilter(prev => ({
                ...prev,
                category: [category],
            }));
        }
        if (tag) {
            setFilter(prev => ({
                ...prev,
                tags: [tag],
            }));
        }
        if (search) {
            setSearchItems(search);
        }
    }, [location.search]);

    useEffect(() => {
        if (products.length > 0) {
            const categories = [...new Set(products.map(p => p.category))];
            const tags = [...new Set(products.flatMap(p => p.tags || []))];
            const maxPrices = Math.max(...products.map(p => p.price));
            setCategories(categories);
            setTags(tags);
            setMaxPrice(Math.ceil(maxPrices / 100) * 100);

            setFilter(prev => ({
                ...prev,
                price: [prev.price[0], maxPrices],
            }));
        }
    }, [products]);

    useEffect(() => {
        if (!products || products.length === 0) return;

        let result = [...products];

        if (searchItems) {
            const lowerWords = searchItems.toLowerCase();
            result = result.filter(p => {
                p.name.toLowerCase().includes(lowerWords) ||
                    p.description.toLowerCase().includes(lowerWords) ||
                    (p.tags && p.tags.some(tag => tag.toLowerCase().includes(lowerWords)));
            });
        }

        if (filter.category.length > 0) {
            result = result.filter(p => {
                const pCategory = p.category;
                return filter.category.includes(pCategory);
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

    return <div>Products</div>;
}
