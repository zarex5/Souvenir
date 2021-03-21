import React, { useState, useEffect, createContext } from 'react';
import { useRoutes } from 'react-router-dom';
import Web3 from 'web3';
import routes from './routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Web3Provider } from './web3context';
import './App.css';

function App() {
  const routing = useRoutes(routes);
  const [web3, setWeb3] = useState(null);

  useEffect(async () => {
    var newWeb3 = new Web3(Web3.givenProvider);
    if(!newWeb3) console.error('Metamask not enabled.');
    else {
      setWeb3(newWeb3);
    }
  }, [])

  return (
    <div className="App">
      <Web3Provider value={web3}>
        {routing}
      </Web3Provider>
    </div>
  );
}

export default App;
