// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '../ethernaut/levels/DoubleEntryPoint.sol';

contract DoubleEntryPointSolution is IDetectionBot {
  IForta target;
  address owner;
  
  constructor(address targetAddress) {
    target = IForta(targetAddress);
    owner = msg.sender;
  }

  function handleTransaction(address, bytes calldata) external override {
    // this level is kinda buggy for allowing this solution?
    // should check that normal tx would succeed
    target.raiseAlert(owner);
  }
}