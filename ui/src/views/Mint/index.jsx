import React, { useContext, useState, useEffect } from "react";
import { Button, Form, Card, Row, Col, Container } from "react-bootstrap";
import Web3Context from "../../web3context";
import { mintToken, storeImage, storeImageFromTemplate } from "../../api";

export default function Tokens() {
  const web3 = useContext(Web3Context);
  const [account, setAccount] = useState("");
  const [image, setImage] = useState("");

  useEffect(async () => {
    if (web3) {
      const accounts = await web3.eth.requestAccounts();
      setAccount(accounts[0]);
    }
  }, [web3]);

  const handleMintTokenFromImage = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const description = e.target.description.value;
    const external_link = e.target.external_link.value;
    const gps = e.target.gps.value;

    const image = e.target.image.files[0];
    if (image) {
      var res = await storeImage(name, description, external_link, gps, image);
      if (res.data.IpfsHash) {
        var res = await mintToken(web3, account, res.data.IpfsHash);
        console.log(res);
      }
    }
  };

  const handleMintCompleteTokenFromTemplate = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const description = e.target.description.value;
    const external_link = e.target.external_link.value;
    const gps = e.target.gps.value;

    const fontColor = e.target.fontColor.value;
    const template = e.target.template.value;
    var res = await storeImageFromTemplate(
      name,
      description,
      external_link,
      gps,
      fontColor,
      template
    );
    console.log(res);
    if (res.data.IpfsHash) {
      var res = await mintToken(web3, account, res.data.IpfsHash);
      console.log(res);
    }
  };

  return (
    <Container align="center" style={{ marginTop: '20px'}}>
      <h1>Mint Tokens ⛏️</h1>
      <hr/>
      <Row>
        <Col>
          <Card style={{height: '400px'}}>
            <Card.Body>
              <Form onSubmit={handleMintTokenFromImage}>
                <h6>Import token</h6>
                <input type="text" id="name" placeholder="Name" defaultValue="Lens" />
                <br />
                <input
                  type="text"
                  id="description"
                  placeholder="Description"
                  defaultValue="Regular token of the city of Lens"
                />
                <br />
                <input
                  type="text"
                  id="external_link"
                  placeholder="Link"
                  defaultValue="https://villedelens.fr"
                />
                <br />
                <input
                  type="text"
                  id="gps"
                  placeholder="GPS coordinates"
                  defaultValue="50.4291723,2.8319805"
                />
                <br />
                <br />
                <input id="image" type="file" />
                <br />
                <Button type="submit">Mint me</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card style={{height: '400px'}}>
            <Card.Body>
              <Form onSubmit={handleMintCompleteTokenFromTemplate}>
                <h6>Generate NFT</h6>
                <input type="text" id="name" placeholder="Name" defaultValue="Lens" />
                <br />
                <input
                  type="text"
                  id="description"
                  placeholder="Description"
                  defaultValue="Regular token of the city of Lens"
                />
                <br />
                <input
                  type="text"
                  id="external_link"
                  placeholder="Link"
                  defaultValue="https://villedelens.fr"
                />
                <br />
                <input
                  type="text"
                  id="gps"
                  placeholder="GPS coordinates"
                  defaultValue="50.4291723,2.8319805"
                />
                <br />
                <br />
                <input
                  type="text"
                  id="fontColor"
                  placeholder="Text color"
                  defaultValue="EEFFEE"
                />
                <Form.Check
                  type="radio"
                  label="Template1"
                  id="template"
                  name="template"
                  value="1"
                  checked="true"
                />
                <Form.Check
                  type="radio"
                  label="Template2"
                  id="template"
                  name="template"
                  value="2"
                />
                <Form.Check
                  type="radio"
                  label="Template3"
                  id="template"
                  name="template"
                  value="3"
                />
                <br />
                <Button type="submit">Mint me</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
