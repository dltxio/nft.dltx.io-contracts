import { task } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";
import { config as dotenvConfig } from "dotenv";
dotenvConfig();

task("accounts", "Prints the list of accounts", async (_agrs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    const balance = hre.ethers.utils.formatEther(await account.getBalance());
    console.log(account.address + ": " + balance + " ETH");
  }
});
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
        mnemonic:
          "hour unusual banana climb interest combine obey cloud object cram jealous upgrade",
      },
      allowUnlimitedContractSize: true,
    },
  },
  solidity: "0.8.0",
};
