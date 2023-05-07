import { expectLevelSolved } from "../utils";
import { deploymentConfirmation } from "./utils";

describe("Gatekeeper Two Solution", function () {
  it("Should solve the level", expectLevelSolved({
    deployId: "14", 
    solutionFn: async ({ challenge }) => {
      await deploymentConfirmation("GatekeeperTwoSolution", challenge.address);
    }
  }));
});
