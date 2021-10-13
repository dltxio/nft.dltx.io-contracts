import { deployContract, deployProxy, upgradeProxy } from "../utils";

export const contractNames = () => ["nft"];

export const constructorArguments = () => [];

export const deploy = async (deployer, setAddresses) => {
  console.log("deploying NFT");
  const nft = await deployContract(
    "DLTx",
    constructorArguments(),
    deployer,
    1
  );
  console.log(
    `deployed NFT to address ${nft.address}`
  );
  setAddresses({ nft: nft.address });
  return nft;
};

export const upgrade = async (deployer, addresses) => {
  return await upgradeProxy(
    "DLTx",
    addresses.nft,
    deployer,
    1
  );
};
