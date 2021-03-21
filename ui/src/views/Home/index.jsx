import React from "react";
import { Jumbotron, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Coin from "../../images/Logo_Souvenir.png";

export default function Home() {
  let navigate = useNavigate();

  const handleClick = (uri) => {
    navigate(uri);
  };

  return (
    <Jumbotron align="center">
      <h1>Hi, there.</h1>
      <p>Welcome to your digital passport to the real world!</p>
      <p>
        <Button variant="primary" onClick={() => handleClick("/tokens")}>
          Go to my tokens
        </Button>
      </p>
      <figure>
        <img src={Coin} alt="logo coin" />
      </figure>
      <br/>
      <Alert key={'matic-config'} variant={'info'} style={{width: '600px'}}>
      <p>The contract is deployed on the Matic Mumbai Testnet </p>
      <p>RPC Url: https://rpc-mumbai.matic.today/,
      Chain ID: 80001</p>
      <p>Make sure you're using the correct network on Metamask.</p>
      </Alert>
    </Jumbotron>
  );
}
