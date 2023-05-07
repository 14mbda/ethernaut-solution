import { expectLevelSolved } from "../utils";
import { txConfirmation } from "./utils";

describe("Token Solution", function () {
  it("Should solve the level", expectLevelSolved({
    deployId: "5", 
    solutionFn: async ({ challenge, accounts: [ eoa ] }) => {
      await txConfirmation(challenge.transfer(
        challenge.address, 
        await challenge.balanceOf(eoa.address) + 1
      ));
    }
  }));
});
