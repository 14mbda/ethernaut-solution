// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "openzeppelin-contracts-08/token/ERC20/IERC20.sol";
import "openzeppelin-contracts-08/token/ERC20/ERC20.sol";
import '../ethernaut/levels/Dex.sol';

contract DexTwoSolution is ERC20 {
  Dex target;
  constructor(string memory name, string memory symbol, uint initialSupply) ERC20(name, symbol) {
    _mint(msg.sender, initialSupply);
  }
}