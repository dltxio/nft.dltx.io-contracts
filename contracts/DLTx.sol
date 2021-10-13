//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.6;

import "./ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

struct MetaData {
  uint256 startdate;
  uint256 enddate;
  uint256 probation;
}

contract DLTx is ERC721, Ownable {
    string private _baseuri = "https://dltx.io/nfts/";
    uint256 public totalSupply;
    mapping (uint256 => MetaData) public mesh;

    function mint(
      address to,
      uint256 startDate,
      uint256 probation
    ) public onlyOwner() {
        require(to != address(0), "Invalid address");
        if (startDate == 0) startDate = block.timestamp;
        mesh[totalSupply] = MetaData(startDate, 0, probation);
        _safeMint(to, totalSupply);
        totalSupply++;
    }

    function terminateNow(uint256 index) external onlyOwner() {
        terminate(index, block.timestamp);
    }

    function terminate(uint256 index, uint256 enddate) public onlyOwner() {
        require(index < totalSupply, "Invalid index");
        require(mesh[index].enddate == 0, "Already terminated");
        mesh[index].enddate = enddate;
    }

    function setProbation(uint256 index, uint256 value) external onlyOwner() {
        mesh[index].probation = value;
    }

    function setStartDate(uint256 index, uint256 value) external onlyOwner {
        require(
            mesh[index].enddate == 0 ||
                mesh[index].startdate < mesh[index].enddate,
            "Start date not lower than end"
        );
        mesh[index].startdate = value;
    }

    function setBaseURI(string memory value) external onlyOwner {
        _baseuri = value;
    }

    function employed(uint256 index) external view returns (bool) {
        return mesh[index].enddate == 0;
    }

    function onProbation(uint256 index) external view returns (bool) {
        return block.timestamp <= mesh[index].startdate + mesh[index].probation;
    }

    function _baseURI() internal view override returns (string memory) {
        return _baseuri;
    }
}
