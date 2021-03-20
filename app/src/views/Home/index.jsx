import React, { useContext, useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import Web3Context from '../../web3context';
import { getTokenURI, getAccountTokens, mintToken } from '../../web3api';

export default function Home() {
  const web3 = useContext(Web3Context);
  const [account, setAccount] = useState("");

  useEffect(async () => {
    if(web3 && account == "") {
      const accounts = await web3.eth.requestAccounts();
      setAccount(accounts[0]);
    }
  });

  const handleMintToken = () => {
    mintToken(web3, account).then(res => {
      console.log(res);
    })
  };

  const handleSubmit = (e) => {
    //Avoids page change on submit
    e.preventDefault();
    const id = e.target.id.value;
    if(id) {
      getTokenURI(web3, id).then(res => {
        console.log(res);
      });
    }
  };

  const handleAllTokens = () => {
    getAccountTokens(web3, account).then(res => {
      console.log(res);
    });
  }

  return (
    <div>
      <h1>{account}</h1>
      <Button onClick={handleMintToken}>Mint token</Button> 
      <Button onClick={handleAllTokens}>Get all tokens</Button> 
      <Form onSubmit={handleSubmit.bind(this)}>
        <input type="number" id="id" placeholder="Type token id"></input>
        <Button type="submit">Get token info</Button> 
      </Form>
    </div>
  )
}