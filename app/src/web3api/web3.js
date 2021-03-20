import SOUVENIR_ADDR from './config';
import SOUVENIR_ABI from './Souvenir';
const IPFS_EXAMPLE = "bafybeigi5l2j6y4jjtgxghlrucoejmjviawv26m667je6twwkfhhwqc5ja";

export async function mintToken(web3, account) {
  try {
    const txAccount = (await web3.eth.requestAccounts())[0];
    const SouvenirContract = new web3.eth.Contract(SOUVENIR_ABI, SOUVENIR_ADDR);
    const gas = await SouvenirContract.methods.mintToken(txAccount, IPFS_EXAMPLE).estimateGas();
    const result = await SouvenirContract.methods.mintToken(account, IPFS_EXAMPLE).send({ from: txAccount, gas });
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

export async function getAccountTokens(web3, account) {
  try {
    const txAccount = (await web3.eth.requestAccounts())[0];
    const SouvenirContract = new web3.eth.Contract(SOUVENIR_ABI, SOUVENIR_ADDR);
    const totalSupply = await SouvenirContract.methods.totalSupply().call({ from: txAccount });
    const tokens = await SouvenirContract.methods.tokenOfOwnerByIndex(account, 4).call({ from: txAccount });
    console.log(tokens)
  }
  catch (err) {
    console.error(err);
    return err;
  }
}