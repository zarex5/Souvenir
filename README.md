# Souvenir

NFTHack ETHGlobal Hackathon 2021

Welcome to the Souvenir repository! Souvenir reimagines what will make future travel meaningful. Souvenir’s goal is to be a flywheel for local economic activity, by giving travelers the opportunity to collect and display unique local NFTs when they participate in activities that the community has deemed important to supporting the local economy, such as visiting a local museum or monument, eating at local restaurants, or buying goods from local makers. 

Souvenir works in collaboration with local governments and creators to determine where NFTs can be collected by travelers and what their unique design will be. The municipality’s NFTs are then minted on Souvenir’s platform and ready to be collected by travelers. To obtain a municipal NFT, Travelers scan a QR Code on their mobile device. This takes them to our platform where they can purchase the NFT from the municipality (using Circle’s merchant payment system).  All proceeds go directly back to the municipality to fund identified local initiatives. The traveller has just collected an NFT that is displayed on their personal Digital Passport in Souvenir, a dedicated platform where travelers can open their NFT collection as a travel book and fill it by collecting more NFTs! 

## Artifacts

- api: contains the API responsible of generating images and storing metadata on IPFS.
- contracts: contains the Truffle project to deploy contracts on the blockchain
- ui: contains a React application

## Installation

### API
Go into the API folder, and install all pip requirements. Launch the api by typing python app.py.

### contracts
Use the truffle migrate command to deploy the contract on-chain. Truffle is already configured for deploying on Matic. Copy the address and paste it into the ui/api/config.js file.

### ui
Go into the ui folder, and launch npm install then npm start. The frontend will start, and you'll be able to interact with the application. Don't forget to configure Metamask for Matic as asked on the frontend homepage!
