# web-3-amazon
# Web3 Amazon Marketplace

## Description
Web3 Amazon Marketplace is a decentralized application (DApp) that replicates a simple e-commerce store functionality on the Ethereum blockchain. It allows users to list items for sale, view available items, and purchase them using Ether (ETH). This project demonstrates the use of smart contracts and blockchain technology to create a transparent and trustless marketplace.

## Technologies Used
- **Ethereum Blockchain**: The decentralized platform that runs smart contracts.
- **Solidity**: A contract-oriented, high-level language for implementing smart contracts on the Ethereum blockchain.
- **web3.js**: A collection of libraries that allow you to interact with a local or remote Ethereum node using HTTP, IPC, or WebSocket.
- **Truffle Suite**: A development environment, testing framework, and asset pipeline for blockchains using the Ethereum Virtual Machine (EVM).
- **Ganache**: A personal blockchain for Ethereum development that makes it easy to develop, deploy, and test DApps in a safe and deterministic environment.
- **MetaMask**: A crypto wallet and gateway to blockchain apps used for accessing the Ethereum blockchain.
- **HTML/CSS**: For structuring and styling the DApp's frontend.

## Features
- **Product Listing**: Users can list their items with details such as name, category, price, and stock quantity.
- **Product Buying**: Users can purchase available items using ETH.
- **Dynamic Updates**: The frontend dynamically updates as new products are listed or purchased.
- **Transparency**: All transactions are transparent and can be verified on the Ethereum blockchain.
- **Non-Custodial**: The DApp operates in a non-custodial manner, ensuring users have full control over their funds.

## Setup and Installation
To run the Web3 Amazon Marketplace on your local machine:

1. **Clone the Repository**
    ```
    git clone <repository_url>
    ```
2. **Install Dependencies**
    ```
    npm install
    ```
3. **Start Ganache**
    Launch Ganache and set up a local blockchain.

4. **Compile and Migrate Contracts**
    ```
    truffle compile
    truffle migrate --reset
    ```
5. **Configure MetaMask**
    Connect MetaMask to the local blockchain provided by Ganache.

6. **Run the DApp**
    ```
    npm run dev
    ```
    This will start a local server, typically on `http://localhost:8080`.

## Usage
- **Adding a Product**: Fill out the form with product details and click "Add Product".
- **Buying a Product**: Click "Buy" on any listed product and confirm the transaction in MetaMask.

## Future Enhancements
- Implement user registration and login functionality.
- Enable a rating and review system for products.
- Expand the payment options to include ERC-20 tokens.
- Provide admin controls for product management and fraud prevention.

## Acknowledgements
I would like to express my gratitude to all the open-source libraries and tools that made this project possible.

