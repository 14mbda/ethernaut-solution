import { LogDescription } from "ethers/lib/utils";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { Contract } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";

var deploymentInfo = require('../packages/ethernaut/client/src/gamedata/deploy.sepolia.json');
var gamedata = require('../packages/ethernaut/client/src/gamedata/gamedata.json');

interface Level {
  instanceContract: string;
  deployId: string;
  deployFunds: number;
};

const deployIdToLevel = (gamedata.levels as Level[]).reduce((acc, level) => {
  acc[level.deployId] = level;
  return acc
}, {} as Record<string, Level>);

const getEventByNameFromTxHash = async (txHash: string, contract: Contract, eventName: string): Promise<LogDescription|undefined> => {
  const txReceipt = await contract.provider!.getTransactionReceipt(txHash);
  if (txReceipt.logs.length === 0) return undefined;
  const events: LogDescription[] = txReceipt.logs
  .map((log) => {
    try {
      return contract.interface.parseLog(log);
    } catch {
      return undefined;
    }
  })
  .filter(Boolean) as LogDescription[];
  return events.find(
    (event) => event.name === eventName);
}

export const submitLevel = async (address: string) => {
  try {
    const ethernaut = await ethers.getContractAt("Ethernaut", deploymentInfo.ethernaut);
    let tx = await ethernaut.submitLevelInstance(address);
    await tx.wait(); 
    return (await getEventByNameFromTxHash(tx.hash, ethernaut, `LevelCompletedLog`)) !== undefined;
  } catch (error) {
    console.error(`submitLevel: ${(error as Error).message}`);
    return false;
  }
};
  
export const createChallenge = async (
  contractLevel: string,
  value: any = `0`
) => {
  try {
    const ethernaut = await ethers.getContractAt("Ethernaut", deploymentInfo.ethernaut);
    let tx = await ethernaut.createLevelInstance(contractLevel, {
      value,
    });
    await tx.wait();

    const event = await getEventByNameFromTxHash(tx.hash, ethernaut, `LevelInstanceCreatedLog`);
    if (!event) throw new Error(`Invalid Event ${JSON.stringify(event)}`);
    return event.args.instance;
  } catch (error) {
    console.error(`createChallenge: ${(error as Error).message}`);
    throw new Error(`createChallenge failed: ${(error as Error).message}`);
  }
};

type Fixture = {
  accounts: SignerWithAddress[];
  challenge: Contract;
};

const deployFixture = async (
  deployId: string
): Promise<Fixture> => {
  const accounts = await ethers.getSigners();
  const level = deployIdToLevel[deployId];
  const challengeFactory = await ethers.getContractFactory(level.instanceContract.replace(".sol", ""));
  const challengeAddress = await createChallenge(
    deploymentInfo[deployId], 
    ethers.utils.parseEther(String(level.deployFunds))
  );
  const challenge = await challengeFactory.attach(challengeAddress);
  return {
    accounts, challenge
  }
};

export const setup = async (
  deployId: string
): Promise<Fixture> => {
  const deployFixtureFn = async () => deployFixture(deployId)
  return await loadFixture(deployFixtureFn);
}

type expectLevelSolvedInput = {
  deployId: string,
  solutionFn: (f: Fixture) => Promise<void>
}

export const expectLevelSolved = ({deployId, solutionFn}: expectLevelSolvedInput): () => Promise<void> => {
  return async () => {
    const fixture = await setup(deployId);
    await solutionFn(fixture);
    expect(await submitLevel(fixture.challenge.address), "level not solved").to.be.true;
  };
}