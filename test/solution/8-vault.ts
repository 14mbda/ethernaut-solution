import { expectLevelSolved } from "../utils";
import { txConfirmation } from "./utils";

describe("Vault Solution", function () {
  it("Should solve the level", expectLevelSolved({
    deployId: "8", 
    solutionFn: async ({ challenge}) => {
      await txConfirmation(
        challenge.unlock(
          await challenge.provider.getStorageAt(challenge.address, 1))
      )
    }
  }));
});
