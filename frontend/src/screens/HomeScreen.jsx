import {Row, Col} from 'react-bootstrap'
import Product from '../components/Product'
import {useEffect, useState} from 'react'
import {useAxios} from '../utils/hooks/useAxios';

const HomeScreen = () => {
    //const [products,setProducts] = useState([]);
    const {data:products, error} = useAxios('/api/products');
    //setProducts(data);
    // useEffect(() =>{
    //     const fetchProducts = async () => {
    //         const {data} = await axios.get('/api/products');
    //         setProducts(data);
    //     }
    //     fetchProducts();
    // }, []);

    return (
        <>
            <h1>Lastest Products</h1>
            <Row>
                {products.map((product) => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                       <Product product={product} />
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default HomeScreen;