//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.6;

import "./ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

struct MetaData {
  uint256 startdate;
  uint256 enddate;
}

contract DLTx is ERC721, Ownable {

  uint256 public totalSupply;
  mapping (uint256 => MetaData) public mesh;

  function mint(address to) public onlyOwner() {
    mint(to, block.timestamp);
  }

  function mint(address to, uint256 startDate) public onlyOwner() {
    require(to != address(0), "Invalid address");

    mesh[totalSupply] = MetaData(startDate, 0);
    _safeMint(to, totalSupply);
    totalSupply++;
  }

  function terminate(uint256 index) public onlyOwner() {
    terminate(index, block.timestamp);
  }

  function terminate(uint256 index, uint256 enddate) public onlyOwner() {
    require(index < totalSupply, "Invalid index");
    require(mesh[index].enddate != 0, "Already terminated");
    mesh[index].enddate = enddate;
  }

  function employed(uint256 index) public view returns (bool) {
    return mesh[index].enddate == 0;
  }
}
