import { Col, Row,Form, Button } from "react-bootstrap"
import Loader from "../components/Loader"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useProfileMutation } from "../slices/usersApiSlice";
import { toast } from "react-toastify";
import { setCredentials } from "../slices/authSlice";

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const {userInfo} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  //const {data:orders, isLoading, error} = useGet
  const [updateProfile, {isLoading: loadingUpdateProfile}] = useProfileMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    if(password !== confirmPassword){
        toast.error('Passwords do not match')
    }else{
        try{
            const res = await updateProfile({
                _id: userInfo._id,
                name,
                email,
                password,
            }).unwrap();
            dispatch(setCredentials({...res}))
            toast.success('Profile updates sccessfully')
        }catch(err){
            toast.error(err?.data?.message || err.error)
        }
    }
    console.log(name, "-",email, "-",password, "-",confirmPassword)
  }
  useEffect(() => {
    if(userInfo){
        setName(userInfo.name)
        setEmail(userInfo.email)
    }
  }, [userInfo, userInfo.name, userInfo.email])

  return (
    <Row>
        <Col md={3}>
            <h2>User Profile</h2>

            <Form onSubmit={submitHandler}>
                <Form.Group className="my-2" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                
                <Form.Group className="my-2" controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group className="my-2" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group className="my-2" controlId="Confirm password">
                    <Form.Label>Confirm password</Form.Label>
                    <Form.Control
                         type="password"
                         placeholder="Confirm Password "
                         value={confirmPassword}
                         onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Update
                </Button>
                {loadingUpdateProfile && <Loader />}
            </Form>
        </Col>
    </Row>
  )
}

export default ProfileScreen