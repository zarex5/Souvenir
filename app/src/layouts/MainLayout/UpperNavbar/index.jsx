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
      <Navbar.Brand onClick={() => handleClick('./')}>Souvenir</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link onClick={() => handleClick('./')}>Home</Nav.Link>
          <Nav.Link onClick={() => handleClick('./tokens')}>Tokens</Nav.Link>
          <Nav.Link onClick={() => handleClick('./mint')}>Mint</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}