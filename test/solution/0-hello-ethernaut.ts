import { expectLevelSolved } from "../utils";
import { txConfirmation } from "./utils";

describe("Hello Ethernaut Solution", function () {
  it("Should solve the level", expectLevelSolved({
    deployId: "0", 
    solutionFn: async ({ challenge }) => {
      await txConfirmation(
        await challenge.authenticate(
          await challenge.password()
        )
      )
    }
  }));
});
