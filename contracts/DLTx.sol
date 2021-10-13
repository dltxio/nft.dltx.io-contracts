//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.6;

import "./ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

struct MetaData {
  uint256 startdate;
  uint256 enddate;
  bool probation;
}

contract DLTx is ERC721, Ownable {
  uint256 public totalSupply;
  mapping (uint256 => MetaData) public mesh;

  function mint(address to) external onlyOwner() {
    mint(to, block.timestamp, false);
  }

  function mint(
      address to,
      uint256 startDate,
      bool probation
  ) public onlyOwner() {
    require(to != address(0), "Invalid address");
    mesh[totalSupply] = MetaData(startDate, 0, true);
    _safeMint(to, totalSupply);
    totalSupply++;
  }

  function terminate(uint256 index) external onlyOwner() {
    terminate(index, block.timestamp);
  }

  function terminate(uint256 index, uint256 enddate) public onlyOwner() {
    require(index < totalSupply, "Invalid index");
    require(mesh[index].enddate != 0, "Already terminated");
    mesh[index].enddate = enddate;
  }

  function setProbation(uint256 index, bool value) external onlyOwner() {
    mesh[index].probation = value;
  }

  function employed(uint256 index) external view returns (bool) {
    return mesh[index].enddate == 0;
  }
}
