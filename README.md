# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.js
```

测试脚本
```shell
重新编译
npx hardhat clean && npx hardhat compile 

测试：
npx hardhat test

部署：
npx hardhat run scripts/deploy.js --network sepolia 

铸造新币：
npx hardhat run scripts/interact.js --network sepolia

```