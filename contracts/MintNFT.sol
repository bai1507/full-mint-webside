// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import '@openzeppelin/contracts/access/Ownable.sol';





contract RobertPunksNFT is ERC721,Ownable{
    uint256 public mintPrice;
    uint256 public totalSupply;
    uint256 public maxSupply;
    uint256 public maxPerWallet; //每个钱包最多挖多少个
    bool public isPublicMintEnabled; //是否允许挖矿，only owner
    string internal baseTokenUri;//图片地址
    address payable public withdrawWallet; //提现地址
    mapping(address=>uint256) public walletMints; //地址对应的NFT数量
    constructor() payable ERC721("RobertPunks","RP"){
        mintPrice = 0.02 ether;
        totalSupply = 0;
        maxSupply = 1000;
        maxPerWallet = 3;
    }

    function setIsPublicMintEnabled(bool _isPublicMintEnabled) external onlyOwner{
        isPublicMintEnabled = _isPublicMintEnabled;
    }

    function setBaseTokenUri(string calldata _baseTokenUri) external onlyOwner{
        baseTokenUri = _baseTokenUri;
    }

    function tokenURI(uint256 _tokenId) public view override returns(string memory){
        require(_exists(_tokenId),'Token does not exist!');
        return string(abi.encodePacked(baseTokenUri,Strings.toString(_tokenId),".json"));
    }

    function withdraw() external onlyOwner{
        (bool success,)= withdrawWallet.call{value:address(this).balance }("");
        require((success),'withdraw failed');
    }

    function mint(uint256 _quantity) public payable{
        require(isPublicMintEnabled,"minting not enabled");
        require(msg.value == _quantity * mintPrice,'wrong mint value');
        require(totalSupply +_quantity <= maxSupply,"sold out");
        require(walletMints[msg.sender] + _quantity <= maxPerWallet,"exced max wallet");

        for(uint256 i =0;i< _quantity;i++){
            uint256 newTokenId = totalSupply + 1;
            totalSupply+=1;
            _safeMint(msg.sender, newTokenId);
        }
    }
}