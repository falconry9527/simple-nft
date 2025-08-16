// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract BasicNFT is ERC721 {
    string private _baseTokenURI;
    
    constructor(string memory baseURI) ERC721("BasicNFT", "BNFT") {
        _baseTokenURI = baseURI;
    }
    
    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }
    
    function mint(address to, uint256 tokenId) public {
        _mint(to, tokenId);
    }
    
    // 自动生成的 tokenURI 会返回 _baseURI + tokenId
    // JS 
    // const tokenURI = await contract.tokenURI(1); 
    // 返回例如 "https://example.com/api/nft/1"
}