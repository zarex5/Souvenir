import React, { useContext, useState, useEffect } from 'react';
import { Button, Form, Card, Row } from 'react-bootstrap';
import Web3Context from '../../web3context';
import { mintToken, storeImage, generateAndStoreImage } from '../../api';

export default function Tokens() {
  const web3 = useContext(Web3Context);
  const [account, setAccount] = useState("");
  const [image, setImage] = useState("");

  useEffect(async () => {
    if(web3) {
      const accounts = await web3.eth.requestAccounts();
      setAccount(accounts[0]);
    }
  }, [web3]);

  const handleMintTokenFromImage = async (e) => {
    e.preventDefault();
    const image = e.target.image.files[0];
    if(image) {
      var res = await storeImage(image);
      if (res.data.IpfsHash) {
        var res = await mintToken(web3, account, res.data.IpfsHash);
        console.log(res);
      }
    }
  };

  const handleMintTokenFromTemplate = async (e) => {
    e.preventDefault();
    const template = e.target.template.value;
    const cityName = e.target.cityName.value;
    var res = await generateAndStoreImage(template, cityName);
    if (res.data.IpfsHash) {
      var res = await mintToken(web3, account, res.data.IpfsHash);
      console.log(res);
    }
  };

  return (
    <div>
      <h1>{account}</h1>
      <Card>
        <Card.Body>
          <Form onSubmit={handleMintTokenFromImage}>
            <input id="image" type="file"/>
            <br/>
            <Button type="submit">Mint token</Button> 
          </Form>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <Form onSubmit={handleMintTokenFromTemplate}>
            <input type="text" id="cityName" placeholder="City name"/>
            <Form.Check type="radio" label="Template1" id="template" name="template" value="1" checked="true"/>
            <Form.Check type="radio" label="Template2" id="template" name="template" value="2"/>
            <Form.Check type="radio" label="Template3" id="template" name="template" value="3"/>
            <br/>
            <Button type="submit">Mint token</Button> 
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}