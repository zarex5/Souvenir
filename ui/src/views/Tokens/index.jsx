import React, { useContext, useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Web3Context from "../../web3context";
import Token from "./Token";
import {
  getTokenOfOwnerByIndex,
  getBalanceOfAccount,
  getTokenMetadata,
} from "../../api";
import Identicon from './Identicon';
import './tokens.css';

export default function Tokens() {
  const web3 = useContext(Web3Context);
  const [account, setAccount] = useState("");
  const [tokens, setTokens] = useState([]);
  const [tokenAmount, setTokenAmount] = useState(0);

  useEffect(async () => {
    if (web3) {
      const accounts = await web3.eth.requestAccounts();
      setAccount(accounts[0]);

      const amountOfTokens = await getBalanceOfAccount(web3, accounts[0]);
      setTokenAmount(amountOfTokens);
      for (let i = 0; i < amountOfTokens; i++) {
        getTokenOfOwnerByIndex(web3, accounts[0], i).then(async (token) => {
          // Avoids race condition to write it like this
          let result = (await getTokenMetadata(token.uri))["data"];
          if (result.constructor == Object) {
            token["data"] = result;
            setTokens((tokens) => [...tokens, token]);
          }
        });
      }
    }
  }, [web3]);

  const handleRarible = () => {
    window.open('https://rinkeby.rarible.com/user/' + account + '?tab=collectibles');
  }

  const handleExplorer = () => {
    window.open('https://rinkeby.etherscan.io/address/' + account);
  }

  return (
    <Container style={{ marginTop: '20px' }}>
      <Row>
        <Col sm={4} align="center">
          <Identicon seed={account} size={40} />
        </Col>
        <Col sm={8}>
          <h1 className="lead" style={{ fontSize: '200%'}}>{account}</h1>
          <h2>Number of <i>Souvenir</i> owned: {tokenAmount}</h2><br/>
          <Button variant="outline-primary" onClick={handleRarible}>Open Rarible</Button>&nbsp;
          <Button variant="outline-primary" onClick={handleExplorer}>Open Explorer</Button>
        </Col>
      </Row>
      <hr/>
      <Row>
        {tokens.map((token) => {
          return (
            <Col sm={4} style={{ padding: '20px'}} >
              <Token token={token} />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}
