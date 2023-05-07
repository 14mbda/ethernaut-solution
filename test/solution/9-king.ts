import { ethers } from "hardhat";
import { expectLevelSolved } from "../utils";
import { deploymentConfirmation } from "./utils";

describe("King Solution", function () {
  it("Should solve the level", expectLevelSolved({
    deployId: "9", 
    solutionFn: async ({ challenge }) => {
      await deploymentConfirmation("KingSolution", challenge.address, {
        value: ethers.utils.parseEther("0.001")
      });
    }
  }));
});
