import { expectLevelSolved } from "../utils";
import { deploymentConfirmation, txConfirmation } from "./utils";

describe("Re-entrancy Solution", function () {
  it("Should solve the level", expectLevelSolved({
    deployId: "10", 
    solutionFn: async ({ challenge }) => {
      const exploit = await deploymentConfirmation("ReentranceSolution", challenge.address);
      await txConfirmation(
        exploit.exploit({
          value: await challenge.provider.getBalance(challenge.address)
        })
      )
    }
  }));
});
