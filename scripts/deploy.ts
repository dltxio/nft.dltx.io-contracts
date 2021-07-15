import * as hre from "hardhat";
import "@nomiclabs/hardhat-ethers";

async function main() {
  const run = hre.run;
  const ethers = hre.ethers;

  await run("compile");

  const DLTx = await ethers.getContractFactory("DLTx");
  const greeter = await DLTx.deploy();

  console.log(`Greeter deployed to: ${greeter.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
