import { expectLevelSolved } from "../utils";
import { deploymentConfirmation, txConfirmation } from "./utils";

describe("Naught Coin Solution", function () {
  it("Should solve the level", expectLevelSolved({
    deployId: "15", 
    solutionFn: async ({ challenge, accounts: [ eoa ] }) => {
      const exploit = await deploymentConfirmation("NaughtCoinSolution", challenge.address);
      await txConfirmation(challenge.approve(exploit.address, await challenge.balanceOf(eoa.address)));
      await txConfirmation(exploit.burn());
    }
  }));
});
