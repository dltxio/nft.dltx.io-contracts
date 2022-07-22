import { task } from "hardhat/config";
import contracts from "../../contracts.json";
import { ethers as tsEthers } from "ethers";
import { getLedgerSigner } from "../utils";
import {Mesh} from "../../build/typechain";

task("mint")
  .addParam("address")
  .addParam("startdate")
  .addOptionalParam("ledgersigner")
  .setAction(async (args, hre) => {
    if (!hre.ethers.utils.isAddress(args.address))
      return console.error("Invalid address");
    let signer: tsEthers.Signer;
    if (!args.ledgersigner) {
      signer = (await hre.ethers.getSigners())[0];
    } else {
      signer = getLedgerSigner(args.ledgersigner, hre.ethers.provider);
    }
    const contractAddress = contracts[hre.network.name].mesh;
    console.log(`network is ${hre.network.name}`);
    console.log(`mesh nft address is ${contractAddress}`);
    console.log(`minting for address ${args.address}`);
    const epoch = dateStringToStartTimestamp(args.startdate);
    console.log(`start date is ${args.startdate} (epoch ${epoch})`);
    const token = (await hre.ethers.getContractFactory("Mesh"))
      .attach(contractAddress)
      .connect(signer) as Mesh;
    await token.mint(args.address, hre.ethers.BigNumber.from(epoch));
    console.log(`minted ${args.amount} for address ${args.address}`);
  });

const dateStringToStartTimestamp = (date: string) => {
  const split = date.split("/").map(date => Number(date));
  const parsed = new Date(split[2], split[1] - 1, split[0]);
  return Math.floor(parsed.getTime()/1000);
};
