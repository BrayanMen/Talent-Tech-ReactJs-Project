import React, { useEffect, useState } from 'react';

export default function HomePage() {
    const [data, setData] = useState([]);
    const [loanding, setLoanding] = useState(true);

    const url = 'https://6825eaad397e48c913143248.mockapi.io/products';

    useEffect(() => {
        const fetchData = () => {
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    setData(data);
                    setLoanding(false);
                })
                .catch(err => {
                    console.log('Error de carga: ', err);
                    setLoanding(false);
                });
        };
        fetchData();
    }, []);
    console.log(data);
    return (
        <div>
            <div>
                {loanding ? <p>Esta cargando</p> : ''}
                <div>
                    {data.map(d => {
                        return (
                            <div key={d.id}>
                                <p style={{color:"white"}}>{d.name}</p>
                                <img src={d.image} alt={d.name} width={"100px"} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
