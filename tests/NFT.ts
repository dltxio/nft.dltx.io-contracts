﻿import { ethers } from "hardhat";
import { ethers as tsEthers } from "ethers";
import { deployContract } from "../scripts/deploy/utils";
import {expect} from "chai";
import {getRevertMessage} from "./utils";

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
  it("Should mint NFT for address", async () => {
    expect(await nft.totalSupply()).to.equal(ethers.constants.Zero);
    await nft.mint(
      await deployer.getAddress(),
      0, // 0 will use block.timestamp
      60
    );
    expect(await nft.totalSupply()).to.equal(ethers.constants.One);
    const metadata = await nft.mesh(0);
    expect(metadata.startdate.gt(0)).to.be.true;
    expect(metadata.enddate).to.equal(0);
    expect(metadata.probation).to.equal(60);
    expect(await nft.onProbation(0)).to.equal(true);
    expect(await nft.employed(0)).to.equal(true);
  });
  it("Should end the probation after 60 seconds passed", async () => {
    // @ts-ignore
    await deployer.provider.send("evm_increaseTime", [60]);
    // @ts-ignore
    await deployer.provider.send("evm_mine", []);
    expect(await nft.onProbation(0)).to.equal(false);
  });
  it("Should change the startdate", async () => {
    await nft.setStartDate(0, 100);
    const metadata = await nft.mesh(0);
    expect(metadata.startdate).to.equal(100);
  });
  it("Should change the probation duration", async () => {
    await nft.setProbation(0, 1);
    const metadata = await nft.mesh(0);
    expect(metadata.probation).to.equal(1);
  });
  it("Should terminate the employment", async () => {
    await nft.terminateNow(0);
    expect(await nft.employed(0)).to.equal(false);
    const metadata = await nft.mesh(0);
    expect(metadata.enddate).to.gte(0);
  });
  it("Should not allow to terminate twice", async () => {
    try {
      await nft.terminateNow(0);
    } catch (error) {
      expect(getRevertMessage(error)).to.equal("Already terminated");
      return;
    }
    throw new Error("Allowed terminating twice");
  });
});
