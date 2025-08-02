const hre = require("hardhat");

async function main() {
  const [owner] = await hre.ethers.getSigners();
  const SimpleNFT = await hre.ethers.getContractFactory("SimpleNFT");
  const nft = await SimpleNFT.deploy(owner.address);

  await nft.waitForDeployment();

  console.log(`SimpleNFT deployed to: ${await nft.getAddress()}`);
  console.log(`Owner address: ${owner.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});