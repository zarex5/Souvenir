import React from 'react';

export default function Token({token}) {
  console.log(token);
  return (
    <div class="card">
      <img class="card-img-top" src={"https://gateway.pinata.cloud/ipfs/" + token.data.image.substring(7)} alt="Token image" />
      <div class="card-body">
        <h5 class="card-title">Token #{token["id"]}</h5>
        <p>City: {token["data"]["name"]}</p>
        <p>Description: {token["data"]["description"]}</p>
        <p>Link: <a href={token["data"]["external_url"]}>{token["data"]["external_url"]}</a></p>
        <p>GPS: {token["data"]["gps"]}</p>
      </div>
    </div>
  )
}