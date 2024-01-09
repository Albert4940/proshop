import { useEffect } from "react";
import {toast} from 'react-toastify'
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom"
import CheckoutSteps from "../components/CheckoutSteps";
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader"
import { useCreateOrderMutation } from "../slices/ordersApiSlice";
import { clearCartItems } from "../slices/cartSlice";

const PlaceOrderScreen = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [createOrder, {isLoading, error}] = useCreateOrderMutation();
  const cart = useSelector((state) => state.cart)
  const {address, city, postalCode, country} = cart.shippingAddress; 
  const {paymentMethod, cartItems, itemsPrice, 
            shippingPrice, taxPrice, totalPrice} = cart;

  useEffect(() => {

    if(!address)
        navigate('/shipping');
    else if(!cart.paymentMethod)
        navigate('/payment');

  }, [cart.paymentMethod, address, navigate])

  const placeOrderHandler = async () => {
    try{
        const res = await createOrder({
            orderItems: cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice
        }).unwrap();

        dispatch(clearCartItems())

        navigate(`/order/${res._id}`)
    }catch(err){
        toast.error(err)
    }
  }

  return (
    <>
        <CheckoutSteps step1 step2 step3 step4 />
        <Row>
            <Col md={8}>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p>
                            <strong>Address: </strong>
                            {address}, {city}, {postalCode}, {country} 
                        </p>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <p>
                            <strong>Method: </strong>
                            {paymentMethod} 
                        </p>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {cartItems.length === 0 ? (
                            <Message>Your cart is empty</Message>
                        ) : (
                            <ListGroup>
                                {cartItems.map((item, index) => (
                                    <ListGroup.Item key={index}>
                                        <Row>
                                            <Col md={1}>
                                                <Image src={item.image} alt={item.name} fluid rounded />
                                            </Col>
                                            <Col>
                                                <Link to={`/product/${item._id}`}>{item.name}</Link>
                                            </Col>
                                            <Col md={4}>
                                            {item.qty} x ${item.price} = $
                                            {(item.qty * (item.price * 100)) / 100}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )}    

                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Order Summary</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Items</Col>
                                <Col>${itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping</Col>
                                <Col>${shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            {error && (
                                <Message variant='danger'>{error?.data?.message}</Message>
                            )}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button
                                type='button'
                                className='btn-block'
                                disabled={cartItems.length === 0}
                                onClick={placeOrderHandler}
                            >
                                Place Order
                            </Button>
                            {isLoading && <Loader />}
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </>
    
  )
}

export default PlaceOrderScreen