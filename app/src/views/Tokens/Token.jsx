import React from 'react';

export default function Token({id, uri}) {
  return (
    <div class="card" style={{width: '200px'}}>
      <img class="card-img-top" src={"https://gateway.pinata.cloud/ipfs/" + uri.substring(7)} alt="Token image" />
      <div class="card-body">
        <h5 class="card-title">Token #{id}</h5>
      </div>
    </div>
  )
}