import { expectLevelSolved } from "../utils";
import { txConfirmation } from "./utils";

describe("Fallback Solution", function () {
  it("Should solve the level", expectLevelSolved({
    deployId: "1", 
    solutionFn: async ({ challenge, accounts: [ eoa ] }) => {
      await txConfirmation(challenge.contribute({value: 1}));
      await txConfirmation(
        eoa.sendTransaction({
          to: challenge.address,
          value: 1
        })
      );
      await txConfirmation(challenge.withdraw());
    }
  }));
});
