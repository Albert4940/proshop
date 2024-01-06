import { Button, Form } from "react-bootstrap"
import { FormContainer } from "../components/FormContainer"
import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { saveShippingAddress } from "../slices/cartSlice"
import CheckoutSteps from "../components/CheckoutSteps"

const ShippingScreen = () => {
    const cart = useSelector((state) => state.cart)
    const {shippingAddress} = cart;

    const navigate = useNavigate()
    const dispatch = useDispatch();

    const [address, setAddress] = useState(shippingAddress?.address || "")
    const [city, setCity] = useState(shippingAddress?.city || "")
    const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || "")
    const [country, setCountry] = useState(shippingAddress?.country || "")

    const handlerSubmit = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({address,city,postalCode,country}));
        navigate('/payment');
    } 
  return (
    <FormContainer>
        <CheckoutSteps step1/>
        <h1>Shipping</h1>
        <Form onSubmit={handlerSubmit}>
            <Form.Group className="py-2" controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control 
                    type="text"
                    value={address}
                    onChange={ e => setAddress(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="py-2" controlId="city">
                <Form.Label>City</Form.Label>
                <Form.Control 
                    type="text"
                    value={city}
                    onChange={ e => setCity(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="py-2" controlId="postalCode">
                <Form.Label>Postal Code</Form.Label>
                <Form.Control 
                    type="text"
                    value={postalCode}
                    onChange={ e => setPostalCode(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="py-2" controlId="country">
                <Form.Label>Country</Form.Label>
                <Form.Control 
                    type="text"
                    value={country}
                    onChange={ e => setCountry(e.target.value)}
                />
            </Form.Group>
            <Button
                type="submit"
                
            >
                Continue
            </Button>
        </Form>
    </FormContainer>
  )
}

export default ShippingScreen