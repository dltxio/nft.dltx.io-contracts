import { ethers } from "hardhat";
import { ethers as tsEthers } from "ethers";
import { deployContract } from "../scripts/deploy/utils";

let nft: tsEthers.Contract;
let deployer: tsEthers.Signer;

describe("NFT", () => {
  before(async () => {
    deployer = (await ethers.getSigners())[0];
  });
  it("Should deploy the NFT", async () => {
    nft = await deployContract(
      "DLTx",
      [],
      deployer,
      1
    );
  });
});
