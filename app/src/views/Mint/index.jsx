import React, { useContext, useState, useEffect } from 'react';
import { Button, Form, Container, Row } from 'react-bootstrap';
import Web3Context from '../../web3context';
import { getTokenURI, mintToken, storeImage, getBalanceOfAccount } from '../../api';

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

  const handleMintToken = async (e) => {
    //Avoids page change on submit
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

  const handleSubmit = (e) => {
    //Avoids page change on submit
    e.preventDefault();
    const id = e.target.id.value;
    if(id) {
      getTokenURI(web3, id).then(res => {
        console.log(res);
        setImage(res);
      });
    }
  };

  const getImageLink = () => {
    let link = "https://gateway.pinata.cloud/ipfs/" + image.substring(7);
    //console.log(link);
    return link;
  }

  return (
    <div>
      <h1>{account}</h1>
      <Form onSubmit={handleMintToken}>
        <div className="form-group">
          <label for="exampleFormControlFile1">IPFS image</label>
          <input id="image" type="file" className="form-control-file" />
        </div>
        <Button type="submit">Mint token</Button> 
      </Form>
      <Form onSubmit={handleSubmit}>
        <input type="number" id="id" placeholder="Type token id"></input>
        <Button type="submit">Get token info</Button> 
      </Form>
      <img src={getImageLink()}></img>
    </div>
  )
}