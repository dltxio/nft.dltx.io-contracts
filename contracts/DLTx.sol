//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.6;

import "hardhat/console.sol";
import "./ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DLTx is ERC721, Ownable {

  uint256 public totalSupply;

  function mint(address to) public onlyOwner() {
    _mint(to, totalSupply);
    totalSupply += 1;
  }
}
