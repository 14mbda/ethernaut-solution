import { ethers } from "hardhat";
import { expectLevelSolved } from "../utils";
import { deploymentConfirmation, txConfirmation } from "./utils";

describe("Gatekeeper Three Solution", function () {
  it("Should solve the level", expectLevelSolved({
    deployId: "28", 
    solutionFn: async ({ challenge }) => {
      await txConfirmation(challenge.createTrick());
      const exploit = await deploymentConfirmation(
        "GatekeeperThreeSolution", 
        challenge.address, 
        {value: ethers.utils.parseEther("0.001").add(1)});
      await txConfirmation(exploit.exploit());
    }
  }));
});
