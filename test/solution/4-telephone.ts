import { expectLevelSolved } from "../utils";
import { deploymentConfirmation } from "./utils";

describe("Telephone Solution", function () {
  it("Should solve the level", expectLevelSolved({
    deployId: "4", 
    solutionFn: async ({ challenge }) => {
      await deploymentConfirmation("TelephoneSolution", challenge.address);
    }
  }));
});
