// import logo from './logo.svg';
import './homepage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createContext, useEffect, useState } from 'react';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Modal } from 'react-bootstrap';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
} from 'mdb-react-ui-kit';

export const DataContext = createContext({});

function App() {
  const [dataFromAPI, setDataFromAPI] = useState([]);
  const satuTigaItems = dataFromAPI.slice(0, 2);
  const [pageSkrg, setPageSkrg] = useState('home');
  const [pageHome, setPageHome] = useState('homepage');
  const [cartItems, setCartItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleCartClick = () => {
    setPageSkrg('cart');
    console.log(pageSkrg);
  };
  const handleHomePage = () => {
    setPageHome('home');
    console.log(pageHome);
  };
  const handleShowModal = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // data dummy
  useEffect(() => {
    axios
      .get('https://dummyjson.com/products?select=title,price,description,images')
      .then((res) => {
        console.log(res.data);
        setDataFromAPI(res.data.products);
      })
      .catch((error) => {
        console.error('Error fetch:', error);
      });
  }, []);

  return (
    <div className="Apps" style={{ backgroundColor: 'grey' }}>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand>ASEP</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
              <Nav.Link onClick={handleHomePage}>Home</Nav.Link>
              <Nav.Link href="#action2">Link</Nav.Link>
              <NavDropdown title="Link" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">Something else here</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#" disabled>
                Link
              </Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Button>
                <FontAwesomeIcon onClick={handleCartClick} icon={faShoppingCart} size="lg" style={{ marginRight: '0px' }} />
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {pageSkrg === 'home' ? (
        <div>
          <Carousel data-bs-theme="dark" style={{ margin: '20px' }}>
            {satuTigaItems.map((item, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100"
                  src={item.images[2]}
                  alt={item.title}
                  style={{ height: '400px', objectFit: 'cover' }}
                />
                <Carousel.Caption>
                  <h5>{item.title}</h5>
                  <p>{item.description}</p>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>

          <div className="container mt-4">
            <div className="row">
              {dataFromAPI.map((item, index) => (
                <div key={index} className="col-sm-6 col-md-4 col-lg-3 mb-4">
                  <MDBCard className="h-100">
                    <MDBCardImage
                      src={item.images[0]}
                      alt=""
                      position="top"
                      style={{ height: '8rem', objectFit: 'cover' }}
                    />
                    <MDBCardBody>
                      <MDBCardTitle>{item.title}</MDBCardTitle>
                      <MDBCardText style={{ height: '100px' }}>{item.description}</MDBCardText>
                      <MDBCardText style={{ color: 'red', fontWeight: 'bolder' }}>
                        ${item.price}
                      </MDBCardText>
                      <Button className="flex-button" onClick={() => handleShowModal(item)}>
                        Checkout
                      </Button>
                    </MDBCardBody>
                  </MDBCard>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Checkout Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Item: {selectedItem && selectedItem.title}</p>
          <p>Price: ${selectedItem && selectedItem.price}</p>
          {/* add */}
        </Modal.Body>
        <Modal.Footer>  
          <Button variant="secondary" onClick={''}>
            Add to Cart
          </Button>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          {/* add */}
        </Modal.Footer>
      </Modal>

      {pageSkrg === 'cart' ? <cart cartItems={cartItems} setCartItems={setCartItems} /> : null}
    </div>
  );
}

export default App;
