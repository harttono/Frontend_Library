import React,{useState} from 'react';
import {Modal,Button,Form} from 'react-bootstrap';
import './Sign-Up.css';
import {Link} from 'react-router-dom';
function SignUp() {
    const [show, setShow] = useState(false);
    const [gender,setGender] = useState('Select Your Gender');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Button variant="danger" onClick={handleShow}>
          Sign Up
        </Button>
  
        <Modal show={show} onHide={handleClose} size='md'>
          <Modal.Header closeButton>
            <Modal.Title>Sign Up</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
                <Form.Group>
                    <Form.Control type="email" placeholder="Email" />
                </Form.Group>
                <Form.Group>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group>
                    <Form.Control type="text" placeholder="Fullname" />
                </Form.Group>
                <Form.Group>
                    <Form.Control as="select" onChange={(e) => setGender(e.target.value)}>
                    <option value="Select your gender">Select your gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Control type="text" placeholder="Phone" />
                </Form.Group>
                <Form.Group>
                    <Form.Control type="text" placeholder="Address" />
                </Form.Group>
                <Form.Group>
                    <Button variant="danger" className='btn-modal-signUp'>Sign Up</Button>
                </Form.Group>
                <Form.Group>
                    <p className='modal-signUp-notify'>
                        Already have an account ? <Link to='/'>Click Here</Link>   
                    </p>
                </Form.Group>
                </Form>
          </Modal.Body>
        </Modal>
      </>
    );
}
    
export default SignUp;