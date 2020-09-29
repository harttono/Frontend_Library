import React,{useState} from 'react';
import {Modal,Button,Form} from 'react-bootstrap';
import './Sign-Up.css';
import {Link} from 'react-router-dom';
function SignIn() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Button variant="light" onClick={handleShow}>
          Sign In
        </Button>
  
        <Modal show={show} onHide={handleClose} size='md' centered>
          <Modal.Header closeButton>
            <Modal.Title>Sign In</Modal.Title>
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
                    <Button variant="danger" className='btn-modal-signUp'>Sign In</Button>
                </Form.Group>
                <Form.Group>
                    <p className='modal-signUp-notify'>
                        Dont't have an account ? <Link to='/'>Click Here</Link>   
                    </p>
                </Form.Group>
                </Form>
          </Modal.Body>
        </Modal>
      </>
    );
}
    
export default SignIn;