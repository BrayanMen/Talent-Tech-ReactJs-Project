import { Link } from 'react-router-dom';
import CardProduct from './CardProduct';

const RelatedProducts = ({ products, title }) => {
    if (products.length === 0) {
        return null;
    }

    return (
        <div className='featured_container'>
                <div className='featured_header'>
                    <h2 className='hero_title'>{title}</h2>
                    <Link to='/products' className='btn btn-secondary'>Ver mas</Link>
                </div>
                <div className='products_grid'>
                    {products.slice(0,5).map(p => {
                        return (
                            <CardProduct key={p.id} product={p}/>
                        );
                    })}
                </div>
            </div>
    );
};

export default RelatedProducts;
