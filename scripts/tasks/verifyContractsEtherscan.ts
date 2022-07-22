import { task } from "hardhat/config";
import contracts from "../../contracts.json";
import { getImplementationAddress } from "@openzeppelin/upgrades-core";

task("verify-contracts-etherscan").setAction(async (args, hre) => {
  console.log(`network is ${hre.network.name}`);
  const networkContracts = contracts[hre.network.name];
  const contractDeploymentModules = (await import("../deploy/contracts"))
    .default;
  for (const module of contractDeploymentModules) {
    for (const contract of module.contractNames()) {
      if (!networkContracts[contract]) continue;
      console.log(`attempting to verify proxy contract "${contract}"`);
      const address = await getImplementationAddress(
        hre.ethers.provider,
        networkContracts[contract]
      );
      await verifyOnEtherscan(
        address,
        // Not all constructorArguments() functions need parameters,
        // but the ones that do should accept parameters in this standard
        // order of inputs.
        module.constructorArguments(
          networkContracts // contract name => contract address dictionary
        ),
        hre
      );
    }
  }
});

const verifyOnEtherscan = async (
  contractAddress,
  constructorArguments = [],
  hre
) => {
  try {
    await hre.run("verify:verify", {
      address: contractAddress,
      constructorArguments
    });
  } catch (e) {
    console.error(e);
  }
};
