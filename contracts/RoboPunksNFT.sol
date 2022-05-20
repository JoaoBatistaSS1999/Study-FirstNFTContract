// SPDX-License-Identifier: UNLINCENSED

pragma solidity ^0.8.9;


import "./@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./@openzeppelin/contracts/access/Ownable.sol";

contract RoboPunksNFT is ERC721, Ownable {
    uint256 public mintPrice; // price of minting
    uint256 public totalSupply; // minted NFTs
    uint256 public maxSupply; // max number possible
    uint256 public maxPerWallet; // max number someone can hold (anti-whale)
    bool public isPublicMintEnable; // if users can mint or not
    string internal baseTokenUri; // Gives the NFTs location
    address public withdrawWallet; // wallet to withdraw the money from the contract
    mapping(address => uint256) public walletMints;

    // We initialize inside of the constructor because is slightly cheaper
    constructor() payable ERC721("RoboPunks", "RP") {
        mintPrice = 0.02 ether;
        totalSupply = 0;
        maxSupply = 1000;
        maxPerWallet = 3;
        withdrawWallet = 0x0856d6BBc41d903eFE2EefeC303Fb2B140DCC15e;
    }

    // only the owner of the contract can call this function 
    // deployer is the owner by default, but we can set it to a different wallet
    function setIsPublicMintEnable(bool isPublicMintEnable_) external onlyOwner{
        isPublicMintEnable = isPublicMintEnable_;
    }

    // "calldata" is similiar to "memory", but we are basically saying that it is only 
    /// going to be read.
    function setBaseTokenUri(string calldata baseTokenUri_) external onlyOwner{
        baseTokenUri = baseTokenUri_;
    }

    // function that opensea call to get the images.
    // already exists in ERC-721 tokens, but we are redefining baseTokenURI
    // so it needs to be changedd here
    function tokenURI(uint256 tokenId_) public view override returns(string memory){
        require(_exists(tokenId_), "Token does not exist!");
        return string(abi.encodePacked(baseTokenUri, Strings.toString(tokenId_), ".json"));
    }

    function withdraw() external onlyOwner {
        // taking the money from the contract and sending to withdraw wallet
        (bool success, ) = withdrawWallet.call{ value: address(this).balance}("");
        require(success, "withdraw failed");
    }

    function mint(uint256 quantity_) public payable {
        require(isPublicMintEnable, "Minting not enable yet");
        require(msg.value == quantity_ * mintPrice, "Incorrect mint value");
        require(totalSupply + quantity_ <= maxSupply, "Sold out!");
        require(walletMints[msg.sender] + quantity_ <= maxPerWallet, "Exceeded max amount per wallet");

        // Use walletMints instead of balanceOf because they can mint and transfer


        // There is ERC-721A, which is a little more gas efficient
        for(uint256 i = 0; i < quantity_; i++) {
            uint256 newTokenId = totalSupply + 1;
            totalSupply++;
            // always change the blockchain state BEFORE interacting with the contract
            // avoid reentrancy attacks
            _safeMint(msg.sender, newTokenId);
        }
    }



}