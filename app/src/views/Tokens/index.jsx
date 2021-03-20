import React, { useContext, useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import Web3Context from '../../web3context';
import Token from './Token';
import { getTokenURI, getTokenOfOwnerByIndex, mintToken, storeImage, getBalanceOfAccount } from '../../api';

export default function Tokens() {
  const web3 = useContext(Web3Context);
  const [account, setAccount] = useState("");
  const [image, setImage] = useState("");
  const [tokens, setTokens] = useState([]);

  useEffect(async () => {
    if(web3) {
      const accounts = await web3.eth.requestAccounts();
      setAccount(accounts[0]);

      const amountOfTokens = await getBalanceOfAccount(web3, accounts[0]);
      for (let i = 0; i < amountOfTokens; i++) {
        getTokenOfOwnerByIndex(web3, accounts[0], i).then((token) => {
          // Avoids race condition to write it like this
          setTokens((tokens) => [...tokens, token]);
        });
      }
    }
  }, [web3]);

  return (
    <div>
      <Container>
        <h1>My tokens ({account})</h1>
        <Row>
          {tokens.map(token => {
            return(<Token id={token.id} uri={token.uri} />)
          })}
        </Row>
      </Container>
    </div>
  )
}