import React, { useContext, useState, useEffect } from 'react';
import Web3Context from '../../web3context';

export default function Home() {
  const web3 = useContext(Web3Context);
  const [account, setAccount] = useState("");

  useEffect(async () => {
    if(web3) {
      const newAccount = await web3.eth.requestAccounts();
      setAccount(newAccount);
    }
  });

  console.log(web3);
  return (
    <h1>{account}</h1>
  )
}