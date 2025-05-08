import { useEffect, useState } from 'react';

import './App.css';

function App() {
    const [data, setData] = useState([]);
    const [loanding, setLoanding] = useState(true);

    const url = 'https://ddragon.leagueoflegends.com/cdn/14.9.1/data/en_US/champion.json';

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                const champs = Object.values(data.data);
                setData(champs);
                setLoanding(false);
            })
            .catch(err => {
                console.log('Error de carga: ', err);
                setLoanding(false);
            });
    }, []);
    console.log(data);

    return (
        <div>
            {loanding ? <p>Esta cargando</p> : ''}
            <div>
                {data.map(d => {
                    return (
                        <div key={d.id}>
                            <p>{d.name}</p>
                            <img
                                src={`https://ddragon.leagueoflegends.com/cdn/14.9.1/img/champion/${d.image.full}`}
                                alt={d.name}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default App;
