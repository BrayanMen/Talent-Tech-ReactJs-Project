import React, { useEffect, useState } from 'react';
import { useProduct } from '../context/ProductContext';

export default function HomePage() {
    const {products, loading} = useProduct()
    const [error, setError] = useState(null);

    const url = 'https://6825eaad397e48c913143248.mockapi.io/products';

    

    if (loading) return <div className="">Cargando productos...</div>;
    if (error) return <div className="">{error}</div>;

    return (
        <div>
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
