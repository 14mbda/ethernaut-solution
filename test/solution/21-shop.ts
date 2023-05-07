import { expectLevelSolved } from "../utils";
import { deploymentConfirmation, txConfirmation } from "./utils";

describe("Shop Solution", function () {
  it("Should solve the level", expectLevelSolved({
    deployId: "21", 
    solutionFn: async ({ challenge }) => {
      const exploit = await deploymentConfirmation("ShopSolution", challenge.address);
      await txConfirmation(exploit.exploit());
    }
  }));
});
