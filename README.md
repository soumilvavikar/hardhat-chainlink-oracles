# Connecting to the Oracles using Hardhat

## Setting up a new Hardhat Project

```shell
# Initialize the npm project
npm init
# Install Hardhat
npm install --save-dev hardhat
# Initialize Hardhat project 
npx hardhat init

npm install --save-dev @nomicfoundation/hardhat-toolbox
```

Update the `hardhat.config.js` file.

## Install the Chain Link Contracts

```shell

# Install the chainlink contracts
npm i @chainlink/contracts
```

## Write the Contract

Refer to `PriceConsumer.sol`, `MockAggregatorV3.sol`, and `PriceConsumerV3Test.js`.

## Build and Unit Test the Smart Contract

```shell
# Build a hardhat project 
npx hardhat compile

# Run tests in the test folder
npx hardhat test
```
