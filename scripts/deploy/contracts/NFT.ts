import { ethers as tsEthers } from "ethers";
import {Mesh, Mesh__factory} from "../../../build/typechain";
import { getSignerForDeployer } from "../utils";

type ConstructorArguments = [];

export const contractNames = () => ["nft"];

export const constructorArguments: () => ConstructorArguments = () => [];

const deployNFT = async (
  constructorArguments: ConstructorArguments,
  signer?: tsEthers.Signer,
  waitCount = 1
) => {
  signer = signer ?? (await getSignerForDeployer());
  const NFT = new Mesh__factory(signer);
  const contract = await NFT.deploy();
  await contract.deployTransaction.wait(waitCount);
  return contract;
};

export const deploy = async (deployer, setAddresses) => {
  console.log("deploying NFT");
  const token: Mesh = await deployNFT(constructorArguments(), deployer, 1);
  console.log(`deployed NFT to address ${token.address}`);
  setAddresses({ nft: token.address });
  return token;
};
