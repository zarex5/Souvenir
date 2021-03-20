import React, { useContext, useState, useEffect } from 'react';
import Web3Context from '../../web3context';
import { souvenirAbi } from '../../abi/abis';

export default function Home() {
  const web3 = useContext(Web3Context);
  const [account, setAccount] = useState("");

  const contractAddr = '0xAb4842507dE9f375Fed54A1138efDEDFdcA128c0';
  const ipfsExample = "bafybeigi5l2j6y4jjtgxghlrucoejmjviawv26m667je6twwkfhhwqc5ja";

  useEffect(async () => {
    if(web3 && account == "") {
      const newAccount = await web3.eth.requestAccounts();
      setAccount(newAccount);

      let account = newAccount[0];
      const SouvenirContract = new web3.eth.Contract(souvenirAbi, contractAddr);
      const gas = await SouvenirContract.methods.mintToken(account, ipfsExample).estimateGas();
      const result = await SouvenirContract.methods.mintToken(account, ipfsExample).send({ from: account, gas });
    }
  });

  console.log(web3);
  return (
    <h1>{account}</h1>
  )
}