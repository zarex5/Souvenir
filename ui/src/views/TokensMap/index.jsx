import React, { useContext, useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import Web3Context from "../../web3context";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import {
  getTokenURI,
  getTokenOfOwnerByIndex,
  mintToken,
  storeImage,
  getBalanceOfAccount,
  getTokenMetadata,
} from "../../api";
import L from 'leaflet';
import './tokens_map.css';

export default function TokensMap() {
  const web3 = useContext(Web3Context);
  const [account, setAccount] = useState("");
  const [image, setImage] = useState("");
  const [tokens, setTokens] = useState([]);

  useEffect(async () => {
    if (web3) {
      const accounts = await web3.eth.requestAccounts();
      setAccount(accounts[0]);

      const amountOfTokens = await getBalanceOfAccount(web3, accounts[0]);
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

  return (
    <MapContainer className='map' center={[48.866, 2.333]} zoom={4} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {tokens.map(token => {
        console.log(token)
        if(token["data"] && token["data"]["gps"] && token["data"]["image"]) {
          const customIcon = new L.Icon({
            iconUrl: "https://gateway.pinata.cloud/ipfs/" + token.data.image.substring(7),
            iconRetinaUrl: "https://gateway.pinata.cloud/ipfs/" + token.data.image.substring(7),
            iconAnchor: null,
            shadowUrl: null,
            shadowSize: null,
            shadowAnchor: null,
            iconSize: new L.Point(50, 50)
          });

          return (
            <Marker position={token.data.gps.split(',')} icon={customIcon}>
              <Popup>
                <span className="popupItem"><b>{'Token #' + token.id}</b></span><hr/>
                <span className="popupItem">City: {token.data.name}</span>
                <span className="popupItem">Description: {token.data.description}</span>
                <span className="popupItem">GPS: {token["data"]["gps"]}</span>
                <span className="popupItem"><a href={token["data"]["external_url"]}>{token["data"]["external_url"]}</a></span>
              </Popup>
            </Marker>
          )
        }
      })}
    </MapContainer>
  )
}
