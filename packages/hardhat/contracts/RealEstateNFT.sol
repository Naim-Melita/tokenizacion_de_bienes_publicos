// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RealEstateNFT is ERC721, Ownable {
    uint256 public nextTokenId;
    mapping(uint256 => string) public propertyMetadata;

    constructor() ERC721("RealEstateNFT", "REALE") {}

    function mint(address to, string memory metadataURI) public onlyOwner {
        uint256 tokenId = nextTokenId;
        _safeMint(to, tokenId);
        propertyMetadata[tokenId] = metadataURI;
        nextTokenId++;
    }

    function getMetadata(uint256 tokenId) public view returns (string memory) {
        return propertyMetadata[tokenId];
    }
}
