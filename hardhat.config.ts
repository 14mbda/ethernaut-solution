import dotenv from "dotenv";
dotenv.config(); // load env vars from .env
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import { task } from "hardhat/config";

const { SEPOLIA_NODE_ENDPOINT, MNEMONIC } = process.env;

if (!SEPOLIA_NODE_ENDPOINT)
  throw new Error(
    `SEPOLIA_NODE_ENDPOINT env var not set. Copy .env.template to .env and set the env var`
  );
if (!MNEMONIC)
  throw new Error(
    `MNEMONIC env var not set. Copy .env.template to .env and set the env var`
  );

const accounts = {
  // derive accounts from mnemonic, see tasks/create-key
  mnemonic: MNEMONIC,
};

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: '0.5.3',
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000,
          },
        },
      },
      {
        version: '0.6.12',
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000,
          },
        },
      },
      {
        version: '0.8.12',
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000,
          },
        },
      },
    ],
  },
  paths: {
    artifacts: './build',
  },
  networks: {
    hardhat: {
      accounts,
      forking: {
        url: SEPOLIA_NODE_ENDPOINT,
        blockNumber: 3410120,
      }
    },
  },
};


// follows ETH/BTC's BIP 39 protocol
// https://iancoleman.io/bip39/
// and matches the one hardhat uses when using { accounts: { mnemonic }}
task(
  "create-key",
  "creates an ETH private / public key pair that can be used for EOAs"
)
  .addParam(
    "mnemonic",
    "The mnemonic used for BIP39 key derivation: See https://iancoleman.io/bip39"
  )
  .setAction(async function (taskArgs, hre, runSuper) {
    console.log("Hello, World!", taskArgs);
    const { mnemonic } = taskArgs;
    const masterKey = hre.ethers.utils.HDNode.fromMnemonic(mnemonic);
    
    console.log(masterKey)
    // "m/44'/60'/0'/0/0" first account
    const getPathForIndex = (index:number) => `m/44'/60'/0'/0/${index}`

    Array.from({ length: 5 }).forEach((_, index) => {
      const key = masterKey.derivePath(getPathForIndex(index));
      console.log(`Key ${getPathForIndex(index)}: ${key.address} (PK: ${key.publicKey}) (sk: ${key.privateKey})`)
    })
  });

/** @type import('hardhat/config').HardhatUserConfig */
export default config;

