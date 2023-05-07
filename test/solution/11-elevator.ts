import { expectLevelSolved } from "../utils";
import { deploymentConfirmation, txConfirmation } from "./utils";

describe("Elevator Solution", function () {
  it("Should solve the level", expectLevelSolved({
    deployId: "11", 
    solutionFn: async ({ challenge }) => {
      const exploit = await deploymentConfirmation("ElevatorSolution", challenge.address);
      await txConfirmation(exploit.goTo());
    }
  }));
});
