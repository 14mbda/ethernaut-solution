import { ethers } from "hardhat";
import { expectLevelSolved } from "../utils";
import { txConfirmation } from "./utils";

describe("MagicNumber Solution", function () {
  it("Should solve the level", expectLevelSolved({
    deployId: "18", 
    solutionFn: async ({ challenge, accounts: [ eoa ] }) => {
      // useful resources:
      // https://www.evm.codes/
      // https://www.evm.codes/playground
      // https://github.com/ethereumbook/ethereumbook/blob/develop/13evm.asciidoc#contract-deployment-code

      // deploy the solver contract
      const [PUSH1, DUP1, CODECOPY, RETURN, MSTORE] = ['0x60', '0x80', '0x39', '0xf3', '0x52']
      const txReceipt = await txConfirmation(
        eoa.sendTransaction({
          data: ethers.utils.concat([
            PUSH1, '0x0a',
            DUP1,
            PUSH1, '0x0b',
            PUSH1, '0x00',
            CODECOPY,         // copy 10 bytes from the byte 11 of code to the start of memory
            PUSH1, '0x00',
            RETURN,           // return the first 10 bytes from the memory
            PUSH1, '0x2a',    // start of contract code, not executed at conctract creation
            PUSH1, '0x00',
            MSTORE,           // load 42 into first 32 bytes memory
            PUSH1, '0x20',
            PUSH1, '0x00',
            RETURN            // return first 32 bytes in memory
          ]),
          gasLimit: 60000
        })
      );
      // set the solver contract
      await txConfirmation(challenge.setSolver(txReceipt.contractAddress));
    }
  }));
});

