import React, { useEffect, useState } from 'react';
import './HomePage.css';
import { useProduct } from '../context/ProductContext';
import { Link, useLocation } from 'react-router-dom';
import Spinner from '../components/ui/Spinner';
import CardProduct from '../components/CardProduct';


export default function HomePage() {
    const {products, loading} = useProduct()
    const [error, setError] = useState(null);
    const [productsFeat, setProductsFeat] = useState([])

    useEffect(()=>{
        if(products.length > 0){
            const productsRandom = [...products].sort(()=> 0.5 - Math.random());
            const productsInStock = productsRandom.filter(p=> p.stock > 0 && p.available);
            setProductsFeat(productsInStock.slice(0,4))
        }
    },[products])
  
    if (loading) return <div className=""><Spinner/></div>;
    if (error) return <div className="">{error}</div>;

    return (
        <div>
        <section id="hero_section" className="hero_section">
        <div className="hero_mask"></div>
        <div 
        className="hero_background"          
        >
        </div>
            <div className="hero_content">
                <h1 className="hero_title">Bienvenido al FUTURO</h1>
                <h3 className="hero_subtitle">Explora tu estilo TeckWear.</h3>
                <p className='hero_p'>Materiales avanzados. Diseño de vanguardia. Funcionalidad inigualable.</p>
                <div className='hero_buttons'>
                <Link to="/about" className="btn btn-secondary">Descubre más</Link>
                <Link to="/products" className="btn btn-primary">Ver productos</Link>
                </div>
            </div>
        </section>
        <section className='featured_section'>
            <div className='featured_container'>
                <div className='featured_header'>
                    <h2 className='hero_title'>Productos Destacados</h2>
                    <Link to='/products' className='btn btn-secondary'>Ver mas</Link>
                </div>
                <div className='products_grid'>
                    {productsFeat.slice(0,5).map(p => {
                        return (
                            <CardProduct key={p.id} product={p}/>
                        );
                    })}
                </div>
            </div>

        </section>
            <div>
                <div>
                    
                </div>
            </div>
        </div>
    );
}
