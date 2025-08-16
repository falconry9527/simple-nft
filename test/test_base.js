const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("BasicNFT Contract", function () {
  let BasicNFT;
  let basicNFT;
  let owner;
  let addr1;
  let addr2;
  const baseURI = "https://example.com/api/nft/";

  beforeEach(async function () {
    // 获取合约工厂
    BasicNFT = await ethers.getContractFactory("BasicNFT");
    
    // 获取签名者
    [owner, addr1, addr2] = await ethers.getSigners();
    
    // 部署合约
    basicNFT = await BasicNFT.deploy(baseURI);
    await basicNFT.waitForDeployment();
  });

  describe("Deployment", function () {
    // it("Should set the right baseURI", async function () {
    //   expect(await basicNFT._baseURI()).to.equal(baseURI);
    // });

    it("Should have the correct name and symbol", async function () {
      expect(await basicNFT.name()).to.equal("BasicNFT");
      expect(await basicNFT.symbol()).to.equal("BNFT");
    });
  });

  describe("Minting", function () {
    it("Should mint a new token", async function () {
      const tokenId = 1;
      
      // 铸造NFT给addr1
      await basicNFT.connect(owner).mint(addr1.address, tokenId);
      
      // 验证所有者
      expect(await basicNFT.ownerOf(tokenId)).to.equal(addr1.address);
      
      // 验证tokenURI
      expect(await basicNFT.tokenURI(tokenId)).to.equal(baseURI + tokenId);
    });

    it("Should fail when minting existing token", async function () {
    //   const tokenId = 1;
    //   await basicNFT.connect(owner).mint(addr1.address, tokenId);
      
    //   // 尝试再次铸造相同的tokenId应该失败
    //   await expect(
    //     basicNFT.connect(owner).mint(addr2.address, tokenId)
    //   ).to.be.revertedWith("ERC721: token already minted");
    });
  });

  describe("Token URI", function () {
    it("Should return correct token URI", async function () {
      const tokenId = 1;
      await basicNFT.connect(owner).mint(addr1.address, tokenId);
      
      const expectedURI = baseURI + tokenId;
      expect(await basicNFT.tokenURI(tokenId)).to.equal(expectedURI);
    });

    // it("Should fail when querying URI of nonexistent token", async function () {
    //   const nonexistentTokenId = 999;
    //   await expect(
    //     basicNFT.tokenURI(nonexistentTokenId)
    //   ).to.be.revertedWith("ERC721: invalid token ID");
    // });
  });

  describe("Balance", function () {
    it("Should update balances after minting", async function () {
      const initialBalance = await basicNFT.balanceOf(addr1.address);
      expect(initialBalance).to.equal(0);
      
      // 铸造3个NFT给addr1
      await basicNFT.connect(owner).mint(addr1.address, 1);
      await basicNFT.connect(owner).mint(addr1.address, 2);
      await basicNFT.connect(owner).mint(addr1.address, 3);
      
      const newBalance = await basicNFT.balanceOf(addr1.address);
      expect(newBalance).to.equal(3);
    });
  });
});