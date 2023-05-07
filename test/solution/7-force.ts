import { expectLevelSolved } from "../utils";
import { deploymentConfirmation } from "./utils";

describe("Force Solution", function () {
  it("Should solve the level", expectLevelSolved({
    deployId: "7", 
    solutionFn: async ({ challenge }) => {
      await deploymentConfirmation("ForceSolution", challenge.address, {
        value: 1
      });
    }
  }));
});
