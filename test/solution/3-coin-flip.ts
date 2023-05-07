import { expectLevelSolved } from "../utils";
import { deploymentConfirmation, txConfirmation } from "./utils";

describe("Coin Flip Solution", function () {
  it("Should solve the level", expectLevelSolved({
    deployId: "3", 
    solutionFn: async ({ challenge }) => {
      const exploit = await deploymentConfirmation("CoinFlipSolution", challenge.address);

      for (let i = 0; i < 10; i++) {
        await txConfirmation(exploit.flip());
      }
    }
  }));
});
