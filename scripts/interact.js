const hre = require("hardhat");
const { ethers } = require("hardhat");

async function main() {
  // 1. 获取部署者账户
  const [deployer] = await ethers.getSigners();
  console.log(`交互使用账户: ${deployer.address}`);
  console.log(`账户余额: ${ethers.formatEther(await deployer.provider.getBalance(deployer.address))} ETH`);

  // 2. 合约地址（替换为你部署的合约地址）
  const contractAddress = "0xBfeF53971f30A9Ff6d60c4aea941902e9ca6568c"; // 替换为实际地址
  
  // 3. 获取合约实例
  const SimpleNFT = await ethers.getContractFactory("SimpleNFT");
  const nft = SimpleNFT.attach(contractAddress);

  // 4. 查询合约基本信息
  console.log(`\n=== 合约基本信息 ===`);
  console.log(`合约地址: ${contractAddress}`);
  console.log(`NFT名称: ${await nft.name()}`);
  console.log(`NFT符号: ${await nft.symbol()}`);
  console.log(`合约所有者: ${await nft.owner()}`);

  // 5. 铸造新NFT
  console.log(`\n=== 铸造NFT ===`);
  const tokenURI = "https://example.com/nft/1.json";
  const mintTx = await nft.safeMint(deployer.address, tokenURI);
  await mintTx.wait();
  console.log(`交易哈希: ${mintTx.hash}`);
  
  // 6. 查询最新铸造的NFT
  const totalSupply = await nft.totalSupply();
  const lastTokenId = totalSupply - 1n;
  console.log(`\n=== NFT详情 ===`);
  console.log(`总供应量: ${totalSupply}`);
  console.log(`最新Token ID: ${lastTokenId}`);
  console.log(`所有者: ${await nft.ownerOf(lastTokenId)}`);
  console.log(`Token URI: ${await nft.tokenURI(lastTokenId)}`);

  // 7. 转移NFT示例
  /*
  const recipient = "0x另一个地址";
  console.log(`\n=== 转移NFT ===`);
  const transferTx = await nft.transferFrom(deployer.address, recipient, lastTokenId);
  await transferTx.wait();
  console.log(`转移交易哈希: ${transferTx.hash}`);
  console.log(`新所有者: ${await nft.ownerOf(lastTokenId)}`);
  */
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});