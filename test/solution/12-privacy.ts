import { ethers } from "hardhat";
import { expectLevelSolved } from "../utils";
import { txConfirmation } from "./utils";

describe("Privacy Solution", function () {
  it("Should solve the level", expectLevelSolved({
    deployId: "12", 
    solutionFn: async ({ challenge }) => {
      await txConfirmation(challenge.unlock(ethers.utils.hexDataSlice(
        await challenge.provider.getStorageAt(challenge.address, 5),
        0, 16
      )));
    }
  }));
});
