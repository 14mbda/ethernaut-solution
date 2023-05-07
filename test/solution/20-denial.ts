import { expectLevelSolved } from "../utils";
import { deploymentConfirmation } from "./utils";

describe("Denial Solution", function () {
  it("Should solve the level", expectLevelSolved({
    deployId: "20", 
    solutionFn: async ({ challenge }) => {
      await deploymentConfirmation("DenialSolution", challenge.address);
    }
  }));
});
