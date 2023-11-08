import logo from './logo.svg';
import './homepage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createContext, useEffect, useState } from 'react';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import axios from 'axios';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBBtn } from 'mdb-react-ui-kit';

export const DataContext = createContext({});

function App() {
  const [dataFromAPI, setDataFromAPI] = useState([]);

  useEffect(() => {
    axios.get('https://dummyjson.com/products?select=title,price,description,images').then(res => {
      console.log(res.data);
      setDataFromAPI(res.data.products);
    })
    .catch((error) => {
      console.error("Error fetch:", error);
    });
  }, []);

  return (
    <div className="Apps">
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
              <Nav.Link href="#action1">Home</Nav.Link>
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
              <Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search" />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="container mt-4">
        <div className="row">
          {dataFromAPI.map((item, index) => (
            <div key={index} className="col-sm-6 col-md-4 col-lg-4 mb-4">
              <MDBCard style={{ width: '18rem' }}>
                <MDBCardImage src={item.images[0]} alt="" position="top" style={{ height: '5rem', objectFit: 'cover' }} />
                <MDBCardBody>
                  <MDBCardTitle>{item.title}</MDBCardTitle>
                  <MDBCardText>{item.description}</MDBCardText>
                  <MDBCardText>${item.price}</MDBCardText>
                  <MDBBtn href="#">Checkout</MDBBtn>
                </MDBCardBody>
              </MDBCard>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
