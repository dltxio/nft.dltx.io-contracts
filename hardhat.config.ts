import "@nomiclabs/hardhat-waffle";
import { config as dotenvConfig } from "dotenv";
dotenvConfig();

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  paths: {
    sources: "./contracts",
    tests: "./tests/contracts",
    cache: "./cache",
    artifacts: "./build",
  },
  networks: {
    hardhat: {
      chainId: 1337,
      accounts: {
        mnemonic: process.env.MNEMONIC,
      },
    },
    kovan: {
      url: process.env.KOVAN_INFURA_URL,
      accounts: [process.env.KOVAN_ACCOUNT],
    },
    localhost: {
      url: "http://127.0.0.1:8545/",
    },
  },
  solidity: "0.8.6",
};
