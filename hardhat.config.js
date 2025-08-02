require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    sepolia: {
      url: "https://sepolia.infura.io/v3/bdb2ede84fe04e41a6fc9b2c9506d8c7",
      accounts: ["50161f35bb22f866be821008200f8d3920302a8623ba37516d9eb6d3a3f55f39"]
    },
    localhost: {
      url: "http://127.0.0.1:8545",
    },
  },
};
