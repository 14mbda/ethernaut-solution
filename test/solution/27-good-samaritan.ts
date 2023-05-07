import { ethers } from "hardhat";
import { expectLevelSolved } from "../utils";
import { deploymentConfirmation, txConfirmation } from "./utils";

describe("Good Samaritan Solution", function () {
  it("Should solve the level", expectLevelSolved({
    deployId: "27", 
    solutionFn: async ({ challenge }) => {
      const exploit = await deploymentConfirmation("GoodSamaritanSolution", challenge.address);
      await txConfirmation(exploit.exploit());
    }
  }));
});
