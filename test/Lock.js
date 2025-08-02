const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SimpleNFT", function () {
  it("Should deploy and mint an NFT", async function () {
    const [owner, addr1] = await ethers.getSigners();

    const SimpleNFT = await ethers.getContractFactory("SimpleNFT");
    const nft = await SimpleNFT.deploy(owner.address);
    
    await nft.waitForDeployment();
    const contractAddress = await nft.getAddress();

    // Mint a new NFT
    const tokenURI = "https://example.com/nft/1";
    await nft.safeMint(owner.address, tokenURI);

    // Check owner of token 0
    expect(await nft.ownerOf(0)).to.equal(owner.address);

    // Check token URI
    expect(await nft.tokenURI(0)).to.equal(tokenURI);

    // Check contract name and symbol
    expect(await nft.name()).to.equal("SimpleNFT");
    expect(await nft.symbol()).to.equal("SNFT");
  });
});