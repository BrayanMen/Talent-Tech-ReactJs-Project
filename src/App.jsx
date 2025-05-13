import { useEffect, useState } from 'react';
import { AuthProvider } from './context/AuthContext.jsx';
import NavBar from './layout/NavBar';

function App() {
    const [data, setData] = useState([]);
    const [loanding, setLoanding] = useState(true);

    const url = 'https://api.escuelajs.co/api/v1/products';

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
        <NavBar>
            <div>
                {loanding ? <p>Esta cargando</p> : ''}
                <div>
                    {data.map(d => {
                        return (
                            <div key={d.id}>
                                <p>{d.title}</p>
                                <img src={d.images[0]} alt={d.title} width="100px" />
                            </div>
                        );
                    })}
                </div>
            </div>
        </NavBar>
    );
}

export default App;
