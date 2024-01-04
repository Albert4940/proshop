import { useNavigate, useLocation} from 'react-router-dom';
import { FormContainer } from "../components/FormContainer"
import { Button, Form, Row, Col } from "react-bootstrap";
import { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';

const  RegisterScreen = ()  => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  
  const navigate = useNavigate();
  const [register, {isLoading}] = useRegisterMutation();
  const dispatch = useDispatch();
  const {userInfo} = useSelector(state => state.auth)
  const {search} = useLocation();
  const sp = new URLSearchParams(search)
  const redirect = sp.get('redirect') || '/'

  useEffect(() => {
    if(userInfo)
        navigate(redirect)
  }, [navigate,redirect, userInfo])
  
  const handlerSubmit = async (e) => {
    e.preventDefault();
    
    if(password !== confirmPassword){
        toast.error("Passwords do not match");
    }else{
        try{
            const res = await register({name, email, password}).unwrap();
            dispatch(setCredentials({...res}))
            navigate(redirect)
        }catch(err){
            toast.error(err?.data?.message || err.message);
        }
    }
  }
  return (
    <FormContainer>
        <h1>Register</h1>
        <Form onSubmit={handlerSubmit}>
            <Form.Group className="my-2" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control 
                    type="name"
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
                disabled={isLoading}
            >
                Register
            </Button>

            {isLoading && <Loader />}
        </Form>
        <Row className="py-2">
            <Col>
            Already have an account?{' '}
            <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                Login
            </Link>
            </Col>
        </Row>
    </FormContainer>
  )
}
export default RegisterScreen;