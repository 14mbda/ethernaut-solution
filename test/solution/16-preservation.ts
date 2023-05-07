import { expectLevelSolved } from "../utils";
import { deploymentConfirmation, txConfirmation } from "./utils";

describe("Preservation Solution", function () {
  it("Should solve the level", expectLevelSolved({
    deployId: "16", 
    solutionFn: async ({ challenge }) => {
      const exploit = await deploymentConfirmation("PreservationSolution", challenge.address);
      await txConfirmation(exploit.exploit());
    }
  }));
});
