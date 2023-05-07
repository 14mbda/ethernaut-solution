import { ethers } from "hardhat";
import { Contract } from "ethers";
import { TransactionResponse, TransactionReceipt } from "@ethersproject/abstract-provider";

export const deploymentConfirmation = async (name: string, ...args: Array<any>): Promise<Contract> => {
  const contractFactory = await ethers.getContractFactory(name);
  const contract = await contractFactory.deploy(...args);
  return await contract.deployed();
}

export const txConfirmation = async (txPromise: Promise<TransactionResponse>): Promise<TransactionReceipt> => {
  const tx = await txPromise;
  return await tx.wait();
}

