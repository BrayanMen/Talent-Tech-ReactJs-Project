import React, { useEffect, useState } from 'react';
import './HomePage.css';
import { useProduct } from '../context/ProductContext';

export default function HomePage() {
    const {products, loading} = useProduct()
    const [error, setError] = useState(null);
  
    if (loading) return <div className="">Cargando productos...</div>;
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
                <a href="#products" className="btn btn-secondary">Descubre más</a>
                <a href="#products" className="btn btn-primary">Ver productos</a>
                </div>
            </div>
        </section>
            <div>
                <div>
                    {products.map(d => {
                        return (
                            <div key={d.id}>
                                <p style={{ color: 'white' }}>{d.name}</p>
                                <img src={d.images[0]} alt={d.name} width={'100px'} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
