import React from 'react';
import { useNavigate } from 'react-router-dom';
import ens from '../../../images/sponsors/ens.png';
import pinata from '../../../images/sponsors/pinata.png';
import polygon from '../../../images/sponsors/polygon.png';

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
      <Navbar.Brand onClick={() => handleClick('./')}><a href="https://app.ens.domains/name/souvenir.eth" title="ENS"><img width="18" height="25" src={ens}></img></a> souvenir.eth</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link onClick={() => handleClick('./')}>Home</Nav.Link>
          <Nav.Link onClick={() => handleClick('./tokens')}>My Passport</Nav.Link>
          <Nav.Link onClick={() => handleClick('./tokens-map')}>Tokens map</Nav.Link>
          <Nav.Link onClick={() => handleClick('./mint')}>Mint</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <span>Powered by <a href="https://pinata.cloud/" title="Pinata"><img width="22" height="32" src={pinata}></img></a> &nbsp;Built on <a href="https://polygon.technology/" title="Polygon"><img width="23" height="22" src={polygon}></img></a></span>
    </Navbar>
  )
}