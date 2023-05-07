const fs = require("fs")
const gamedata = require('../packages/ethernaut/client/src/gamedata/gamedata.json');

interface Level {
  name: string;
  instanceContract: string;
  deployId: string;
  deployFunds: number;
}

const generateLevelFileContent = (level: Level) => `import { ethers } from "hardhat";
import { expectLevelSolved } from "../utils";

describe("${level.name} Solution", function () {
  it("Should solve the level", expectLevelSolved({
    deployId: "${level.deployId}", 
    solutionFn: async ({ challenge, accounts: [ eoa ] }) => {
      // your solution here
    }
  }));
});
`;

const generateLevelFiles = (levels: Level[], directoryPath: string) => {
  if (!directoryExists(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true });
  }

  levels.forEach((level) => {
    const filename = `${directoryPath}/${level.deployId}-${level.name.replace(" ", "-").toLowerCase()}.ts`;
    const fileContent = generateLevelFileContent(level);
    fs.writeFileSync(filename, fileContent);
  });
}

function directoryExists(directoryPath: string): boolean {
  try {
    return fs.statSync(directoryPath).isDirectory();
  } catch {
    return false;
  }
}
  
generateLevelFiles(gamedata.levels, "./test/solution");