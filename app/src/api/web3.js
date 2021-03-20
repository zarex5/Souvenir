import { SOUVENIR_ADDR } from './config';
import SOUVENIR_ABI from './Souvenir';

export async function mintToken(web3, account, ipfsHash) {
  try {
    const txAccount = (await web3.eth.requestAccounts())[0];
    const SouvenirContract = new web3.eth.Contract(SOUVENIR_ABI, SOUVENIR_ADDR);
    const gas = await SouvenirContract.methods.mintToken(account, ipfsHash).estimateGas();
    const result = await SouvenirContract.methods.mintToken(account, ipfsHash).send({ from: txAccount, gas });
    return result;
  }
  catch (err) {
    console.error(err);
    return err;
  }
}

export async function getTokenURI(web3, id) {
  try {
    const txAccount = (await web3.eth.requestAccounts())[0];
    const SouvenirContract = new web3.eth.Contract(SOUVENIR_ABI, SOUVENIR_ADDR);
    const result = await SouvenirContract.methods.tokenURI(id).call({ from: txAccount });
    return result;
  }
  catch (err) {
    console.error(err);
    return err;
  }
}

export async function getBalanceOfAccount(web3, account) {
  try {
    const txAccount = (await web3.eth.requestAccounts())[0];
    const SouvenirContract = new web3.eth.Contract(SOUVENIR_ABI, SOUVENIR_ADDR);
    const result = await SouvenirContract.methods.balanceOf(account).call({ from: txAccount });
    return result;
  }
  catch (err) {
    console.error(err);
    return err;
  }
}

export async function getTokenOfOwnerByIndex(web3, account, id) {
  try {
    const txAccount = (await web3.eth.requestAccounts())[0];
    const SouvenirContract = new web3.eth.Contract(SOUVENIR_ABI, SOUVENIR_ADDR);
    const tokens = await SouvenirContract.methods.tokenOfOwnerByIndex(account, id).call({ from: txAccount });
    console.log(tokens)
  }
  catch (err) {
    console.error(err);
    return err;
  }
}