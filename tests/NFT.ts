import { ethers } from "hardhat";
import {deployProxy} from "../scripts/deploy/utils";
import {expect} from "chai";
import {Mesh} from "../build/typechain";
import {constructorArguments} from "../scripts/deploy/contracts/Mesh";
import {Signer, Wallet} from "ethers";

let nft: Mesh;
let deployer: Signer;
let meshie: Wallet;

describe("NFT", () => {
  before(async () => {
    deployer = (await ethers.getSigners())[0];
    meshie = Wallet.createRandom().connect(deployer.provider);
    // fund meshie
    await deployer.sendTransaction({
      to: meshie.address,
      value: ethers.utils.parseEther("10000000"),
    });
    nft = (await deployProxy(
      "Mesh",
      constructorArguments(),
      deployer,
      1
    )) as Mesh;
  });

  it("Should mint NFT for meshie's address", async () => {
    expect(await nft.totalSupply()).to.equal(ethers.constants.Zero);
    await nft.mint(
      meshie.address,
      0 // 0 will use block.timestamp
    );
    expect(await nft.totalSupply()).to.equal(ethers.constants.One);
    expect(await nft.balanceOf(meshie.address)).to.equal(1);
    expect(await nft.ownerOf(0)).to.equal(meshie.address);
    const metadata = await nft.mesh(0);
    expect(metadata.startTimestamp.gt(0)).to.be.true;
    expect(metadata.endTimestamp).to.equal(0);
    expect(metadata.probationSeconds).to.equal(30 * 3 * 24 * 60 * 60);
    expect(await nft.onProbation(0)).to.equal(true);
    expect(await nft.employed(0)).to.equal(true);
  });

  it("Should not allow meshie to transfer NFT", async () => {
    await expect(nft.connect(meshie).transferFrom(
      meshie.address,
      Wallet.createRandom().address,
      0
    )).to.be.revertedWith("Not so fast");
  });

  it("Should end the probation after 90 days passed", async () => {
    // @ts-ignore
    await deployer.provider.send("evm_increaseTime", [30 * 3 * 24 * 60 * 60 + 1]);
    // @ts-ignore
    await deployer.provider.send("evm_mine", []);
    expect(await nft.onProbation(0)).to.equal(false);
  });

  it("Should change the startdate", async () => {
    await nft.setStartTimestamp(0, 100);
    const metadata = await nft.mesh(0);
    expect(metadata.startTimestamp).to.equal(100);
  });

  it("Should change the probation duration", async () => {
    await nft.setProbation(0, 1);
    const metadata = await nft.mesh(0);
    expect(metadata.probationSeconds).to.equal(1);
  });

  it("Should terminate the employment", async () => {
    await nft.terminateNow(0);
    expect(await nft.employed(0)).to.equal(false);
    const metadata = await nft.mesh(0);
    expect(metadata.endTimestamp).to.gte(0);
  });

  it("Should not allow to terminate twice", async () => {
    await expect(nft.terminateNow(0))
      .to.be.revertedWith("Already terminated");
  });

  it("Should return the correct tokenURI", async () => {
    expect(await nft.tokenURI(0)).to.equal("https://nft.dltx.io/metadata/0.json");
  });

  it("Should request upgrade", async () => {
    await nft.mint(await deployer.getAddress(), 0);
    const totalSupply = await nft.totalSupply();
    await nft.approveUpgrade(totalSupply);
  });
});
