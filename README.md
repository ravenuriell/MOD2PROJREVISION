# LUSTAVIA ETHEREUM NETWORK

This project is a simple Ethereum-based ATM application using Solidity smart contracts and a React frontend. It allows users to deposit, withdraw, and transfer Ether, and view their transaction history.

## Features

- **Deposit**: Users can deposit 1 ETH into the contract.
- **Withdraw**: Users can withdraw 1 ETH from the contract.
- **Transfer**: Users can transfer 1 ETH to another MetaMask account.
- **Transaction History**: Users can view their transaction history, including deposits, withdrawals, and transfers.

## Smart Contract

The smart contract is written in Solidity and deployed on the Ethereum network. It includes functions for depositing, withdrawing, transferring, and fetching the balance and transaction history.

## Frontend

The frontend is built using React and interacts with the smart contract using Ethers.js. It provides a user interface for connecting a MetaMask wallet, performing deposit, withdraw, and transfer operations, and viewing the transaction history.

## Setup and Installation

### Prerequisites

- Node.js
- MetaMask extension installed in your browser
- Ethereum wallet with some ETH for testing

### Instructions

1. **Clone the repository**:
    ```sh
    git clone <repository_url>
    cd <repository_name>
    ```

2. **Install dependencies**:
    ```sh
    npm install
    ```

3. **Compile the smart contract**:
    ```sh
    npx hardhat compile
    ```

4. **Deploy the smart contract**:
    ```sh
    npx hardhat run scripts/deploy.js --network localhost
    ```

5. **Start the local blockchain**:
    ```sh
    npx hardhat node
    ```

6. **Run the frontend application**:
    ```sh
    npm run dev
    ```

## Usage

1. Open the frontend application in your browser.
2. Connect your MetaMask wallet.
3. Use the interface to deposit, withdraw, and transfer ETH.
4. View your transaction history in the application.
