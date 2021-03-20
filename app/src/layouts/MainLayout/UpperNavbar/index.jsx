import React from 'react';
import { useNavigate } from 'react-router-dom';

import { 
  Navbar,
  Nav
} from 'react-bootstrap';

export default function UpperNavbar() {
  let navigate = useNavigate();

  const handleClick = (uri) => {
    navigate(uri);
  }

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand onClick={() => handleClick('./home')}>Souvenir</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link onClick={() => handleClick('./home')}>Home</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}