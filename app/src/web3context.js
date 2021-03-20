import React from 'react'; 

const Web3Context = React.createContext();

export const Web3Provider = Web3Context.Provider;
export const Web3Consumer = Web3Context.Consumer;

export default Web3Context;