import HomePage from './pages/HomePage.jsx';
import { Route, Routes } from 'react-router-dom';
import MainLayout from './layout/MainLayout.jsx';

function App() {
    return (
        <MainLayout>
            <Routes>
                <Route exact path="/" element={<HomePage />} />
            </Routes>
        </MainLayout>
    );
}

export default App;
