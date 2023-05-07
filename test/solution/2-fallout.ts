import { expectLevelSolved } from "../utils";
import { txConfirmation } from "./utils";

describe("Fallout Solution", function () {
  it("Should solve the level", expectLevelSolved({
    deployId: "2", 
    solutionFn: async ({ challenge }) => {
      await txConfirmation(challenge.Fal1out());
    }
  }));
});
