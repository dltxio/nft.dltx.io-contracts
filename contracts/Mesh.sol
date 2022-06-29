// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "./ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

struct Meshie {
    uint256 startTimestamp;
    uint256 endTimestamp;
    uint256 probationSeconds;
    bool isSudo;
}

contract Mesh is ERC721, Ownable {
    string private _baseuri = "https://dltx.io/nfts/";
    uint256 public totalSupply;

    mapping (uint256 => Meshie) public mesh;
    mapping (uint256 => uint256) private _upgrades;
    mapping (address => uint256) private _nftHodlers;

    function mint(
        address to,
        uint256 startTimestamp,
        uint256 probationSeconds,
        bool isSudo
    ) public onlyOwner() {
        require(to != address(0), "Invalid address");
        if (startTimestamp == 0) startTimestamp = block.timestamp;
        mesh[totalSupply] = Meshie(startTimestamp, 0, probationSeconds, isSudo);
        _safeMint(to, totalSupply);
        _nftHodlers[to] = totalSupply;
        totalSupply++;
    }

    function terminateNow(uint256 index) external onlyOwner() {
        terminate(index, block.timestamp);
    }

    function terminate(uint256 index, uint256 endTimestamp) public onlyOwner() {
        require(index < totalSupply, "Invalid index");
        require(mesh[index].endTimestamp == 0, "Already terminated");
        mesh[index].endTimestamp = endTimestamp;
    }

    function setProbation(uint256 index, uint256 value) external onlyOwner() {
        mesh[index].probationSeconds = value;
    }

    function setStartTimestamp(uint256 index, uint256 value) external onlyOwner {
        require(
            mesh[index].endTimestamp == 0 ||
                mesh[index].startTimestamp < mesh[index].endTimestamp,
            "Start date not lower than end"
        );
        mesh[index].startTimestamp = value;
    }

    function setBaseURI(string memory value) external onlyOwner {
        _baseuri = value;
    }

    function employed(uint256 index) external view returns (bool) {
        return mesh[index].endTimestamp == 0;
    }

    function onProbation(uint256 index) external view returns (bool) {
        return block.timestamp <= mesh[index].startTimestamp + mesh[index].probationSeconds;
    }

    function requestUpgrade(uint256 index) external {
        require(mesh[index].isSudo == false, "Already one!");
        require(ownerOf(index) == msg.sender, "Don't be silly!");

        _upgrades[index] = 0;
        emit RequestingSudoUpgrade(msg.sender, index);
    }

    function approveUpgarde(uint256 index) external onlySudo {
        require(mesh[index].isSudo == false, "Already one!");

        _upgrades[index]++;

        if (_upgrades[index] > 1) {
            mesh[index].isSudo = true;
            address who = ownerOf(index);
            emit Upgraded(who, index);
        }
    }

    function _baseURI() internal view override returns (string memory) {
        return _baseuri;
    }

    modifier onlySudo() {
        uint256 index = _nftHodlers[msg.sender];
        require(mesh[index].isSudo = true, "su != true");

        _;
    }

    event RequestingSudoUpgrade(address indexed who, uint256 index);
    event Upgraded(address indexed who, uint256 index);
    event WelcomeToTheMesh(address indexed who, uint256 index);
}
