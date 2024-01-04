import { useNavigate, useLocation} from 'react-router-dom';
import { FormContainer } from "../components/FormContainer"
import { Button, Form, Row, Col } from "react-bootstrap";
import { useState } from 'react';
import { toast } from "react-toastify";

const  RegisterScreen = ()  => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  
  const handlerSubmit = (e) => {
    e.preventDefault();
    
    if(password !== confirmPassword){
        toast.error("Two passwords aren't identicaly");
    }
  }
  return (
    <FormContainer>
        <h1>Register</h1>
        <Form onSubmit={handlerSubmit}>
            <Form.Group className="my-2" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control 
                    type="text"
                    value={name}
                    placeholder="Enter name"
                    onChange={e => setName(e.target.value)}
                ></Form.Control>
            </Form.Group>
            <Form.Group className="my-2" controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control 
                    type="email"
                    value={email}
                    placeholder="Enter email"
                    onChange={e => setEmail(e.target.value)}
                ></Form.Control>
            </Form.Group>
            <Form.Group className="my-2" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                    type="password"
                    value={password}
                    placeholder="Enter password"
                    onChange={e => setPassword(e.target.value)}
                ></Form.Control>
            </Form.Group>
            <Form.Group className="my-2" controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control 
                    type="password"
                    value={confirmPassword}
                    placeholder="Confirm Password"
                    onChange={e => setConfirmPassword(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Button
                type="submit"
                variant="primary"
            >
                Register
            </Button>
        </Form>
    </FormContainer>
  )
}
export default RegisterScreen;