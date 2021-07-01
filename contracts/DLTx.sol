//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.6;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract DLTx is ERC721 {
  constructor() ERC721("DLTx.io", "DLTX") {
  }
}
