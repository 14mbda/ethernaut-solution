import { ethers } from "hardhat";
import { expectLevelSolved } from "../utils";
import { deploymentConfirmation, txConfirmation } from "./utils";

describe("DoubleEntryPoint Solution", function () {
  it("Should solve the level", expectLevelSolved({
    deployId: "26", 
    solutionFn: async ({ challenge }) => {
      const forta = await ethers.getContractAt("contracts/ethernaut/levels/DoubleEntryPoint.sol:IForta", await challenge.forta());
      const solution = await deploymentConfirmation("DoubleEntryPointSolution", forta.address);
      await txConfirmation(forta.setDetectionBot(solution.address));
    }
  }));
});
