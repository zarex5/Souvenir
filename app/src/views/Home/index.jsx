import React from 'react';
import { Jumbotron, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  let navigate = useNavigate();

  const handleClick = (uri) => {
    navigate(uri);
  }

  return (
    <Jumbotron>
      <h1>Hello, world!</h1>
      <p>
        This app is the future interface of Souvenir, a dApp to earn NFTs when travelling around the world!
      </p>
      <p>
        <Button variant="primary" onClick={() => handleClick('/tokens')}>Go to my tokens</Button>
      </p>
    </Jumbotron>
  )
}