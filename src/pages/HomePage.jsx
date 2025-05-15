import React, { useEffect, useState } from 'react';

export default function HomePage() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const url = 'https://6825eaad397e48c913143248.mockapi.io/products';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    'https://6825eaad397e48c913143248.mockapi.io/products'
                );
                if (!response.ok) throw new Error('Error al cargar productos');
                const data = await response.json();
                setData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div className="">Cargando productos...</div>;
    if (error) return <div className="">{error}</div>;

    return (
        <div>
            <div>
                <div>
                    {data.map(d => {
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
